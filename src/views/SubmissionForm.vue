<template>
  <main class="container">
    <h2>
      <span v-show="!poster">Submit</span
      ><span v-show="poster">Update</span> Your Poster
    </h2>
    <div class="grid">
      <form v-on:submit.prevent="onSubmit">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
        <label for="authors">Author(s)</label>
        <input type="text" id="authors" v-model="authors" required />
        <label for="abstract">abstract</label>
        <quill-editor
          class="editor"
          ref="myQuillEditor"
          v-model="content"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          :options="editorOption"
        />
        <!-- <div v-html="sanitizedAbstract"></div>
        <label for="abstract">abstract</label>
        <textarea id="abstract" v-model="abstract" required /> -->
        <label for="topic">Topic</label>
        <select id="topic" v-model="selected" required>
          <!-- inline object literal -->
          <option disabled value="">Please select one</option>
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>
        <div class="poster-instructions">
          <div>
            <p><strong>Poster Image Instructions</strong></p>
            <ul>
              <li>
                Poster files must be in an image format (like .jpg or .png) and
                less than 1MB in size (<a
                  href="https://imagecompressor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >optimize your image if necessary</a
                >).
              </li>
              <li>PDFs are not accepted.</li>
              <li>Images should be 1200 px in width and 1600 px in height.</li>
            </ul>
          </div>
          <div class="mockup">
            <div>
              <span>&#8672; 1200 px &#8674;</span>
              <span>&#8672; 1600 px &#8674;</span>
            </div>
          </div>
        </div>
        <label for="image"
          >Poster Image Upload<span v-show="loadingImg" class="loading">
            <v-icon name="spinner" pulse></v-icon> </span
        ></label>
        <input
          type="file"
          id="image"
          name="filename"
          accept="image/*"
          @change="filesChange($event.target.name, $event.target.files)"
        />
        <p class="helper">File size must be less than 1MB</p>
        <Button type="color" class="submit-button">
          <button type="submit" :disabled="loading">
            <span v-show="!poster">Submit</span
            ><span v-show="poster">Update</span>
          </button></Button
        ><span v-show="loading" class="loading">
          <v-icon name="spinner" pulse></v-icon>
        </span>
      </form>
      <div class="preview">
        <Card
          :title="title || 'Poster Title'"
          :authors="authors || 'Authors'"
          :abstract="abstract || 'Poster abstract...'"
          :img="previewImage || ''"
          :topic="selected || 'Philosophy of science'"
          :topicSlug="getTopicSlug(selected)"
          :isPreview="true"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import sanitize from 'xss';
import { quillEditor } from 'vue-quill-editor';
import slugify from 'slugify';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import supabase from '@/db';
import { topics, topicMap } from '@/topics';

export default {
  components: {
    Card,
    Button,
    quillEditor,
  },

  data() {
    return {
      topics,
      title: '',
      authors: '',
      abstract: '',
      selected: '',
      topic_slug: '',
      previewImage: null,
      image: '',
      loading: false,
      loadingImg: false,
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            'bold',
            'italic',
            'link',
            'blockquote',
            { list: 'bullet' },
            { list: 'ordered' },
            { script: 'sub' },
            { script: 'super' },
            'code-block',
            'clean',
          ],
        },
      },
    };
  },

  computed: {
    ...mapState(['user', 'poster']),
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    sanitizedAbstract() {
      if (this.content) {
        return sanitize(this.content);
      }
      return null;
    },
  },

  methods: {
    ...mapActions(['launchToast', 'setPoster']),

    async filesChange(...args) {
      // TODO If user cancels operation, handle error
      const files = args;
      const file = files[1];

      if (file[0].size > 1000000) {
        this.launchToast({
          type: 'error',
          show: true,
          content: 'File size exceeds 1MB',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file[0]);

      try {
        this.loadingImg = true;
        const filename = `${this.user.id}${slugify(file[0].name, {
          lower: true,
        })}`;
        const { data, error } = await supabase.storage
          .from('poster-img')
          .upload(filename, file[0], {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        const { Key } = data;
        const name = Key.split('/')[1];
        const res = supabase.storage.from('poster-img').getPublicUrl(name);

        this.image = res.publicURL;
      } catch (error) {
        this.launchToast({
          type: 'error',
          show: true,
          content: error.message,
        });
      } finally {
        this.loadingImg = false;
      }
    },

    async onSubmit() {
      if (!this.image) {
        this.launchToast({
          type: 'error',
          show: true,
          content: 'Please wait for the image to upload',
        });
        return;
      }

      try {
        this.loading = true;

        if (!this.poster) {
          const { data, error } = await supabase.from('posters').insert([
            {
              title: this.title,
              authors: this.authors,
              abstract: this.sanitizedAbstract,
              topic: this.selected,
              topic_slug: this.getTopicSlug(this.selected),
              image: this.image,
              creator_id: this.user.id,
            },
          ]);

          if (error) throw error;

          await supabase
            .from('profiles')
            .insert([{ id: this.user.id, poster: data[0].id }], {
              upsert: true,
            });

          this.launchToast({
            type: 'success',
            show: true,
            content: 'Poster uploaded successfully',
          });
        } else {
          // Update the poster
          const { data, error } = await supabase.from('posters').upsert({
            id: this.poster.id,
            title: this.title,
            authors: this.authors,
            abstract: this.sanitizedAbstract,
            topic: this.selected,
            topic_slug: this.getTopicSlug(this.selected),
            image: this.image,
            creator_id: this.user.id,
          });

          if (error) throw error;
          this.setPoster(data[0]);

          this.launchToast({
            type: 'success',
            show: true,
            content: 'Poster updated successfully',
          });
        }

        this.$router.push('/profile');
      } catch (error) {
        this.launchToast({
          type: 'error',
          show: true,
          content: error.message,
        });
      } finally {
        this.loading = false;
      }
      // Update state to reflect user has poster
    },

    getTopicSlug(topic) {
      return topicMap[topic] && topicMap[topic].slug;
    },

    onEditorBlur() {
      this.$refs.myQuillEditor.$el.classList.remove('focus');
    },
    onEditorFocus() {
      this.$refs.myQuillEditor.$el.classList.add('focus');
    },
    onEditorChange({ html }) {
      this.content = html;
    },
  },

  created() {
    if (this.poster) {
      this.title = this.poster.title;
      this.authors = this.poster.authors;
      this.abstract = this.poster.abstract;
      this.content = this.poster.abstract;
      this.selected = this.poster.topic;
      this.topic_slug = this.poster.topic_slug;
      this.image = this.poster.image;
      this.previewImage = this.poster.image;
      this.creator_id = this.user.id;
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 1rem 0 3rem;
}
</style>

<style lang="scss">
.ql-toolbar.ql-snow {
  padding: 0 !important;
  border: none !important;
}
.ql-container.ql-snow {
  height: 40ch;
  padding: 0 !important;
  border: 0 !important;
  border-top: 1px solid var(--dark) !important;
}
.quill-editor,
.ql-container {
  font-family: inherit !important;
}
.ql-editor {
  padding: 0.5rem 0 0 !important;
  font-family: inherit !important;
  font-size: 0.9rem !important;
}

.ql-snow a {
  color: var(--dark) !important;
}

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button:focus .ql-stroke,
.ql-snow .ql-toolbar button:focus .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button:hover .ql-stroke-miter,
.ql-snow .ql-toolbar button:hover .ql-stroke-miter,
.ql-snow.ql-toolbar button:focus .ql-stroke-miter,
.ql-snow .ql-toolbar button:focus .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
  stroke: var(--teal) !important;
}

.ql-editor.ql-blank::before {
  left: 0 !important;
}

.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
  color: var(--teal);
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button:focus .ql-fill,
.ql-snow .ql-toolbar button:focus .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
  fill: var(--teal);
}
</style>
