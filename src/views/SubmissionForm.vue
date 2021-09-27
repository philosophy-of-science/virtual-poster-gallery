<template>
  <div class="container">
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
        <textarea id="abstract" v-model="abstract" required />
        <label for="topic">Topic</label>
        <select id="topic" v-model="selected" required>
          <!-- inline object literal -->
          <option disabled value="">Please select one</option>
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import supabase from '@/db';
import { topics, topicMap } from '@/topics';

export default {
  components: {
    Card,
    Button,
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
    };
  },

  computed: mapState(['user', 'poster']),

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
              abstract: this.abstract,
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
            abstract: this.abstract,
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
  },

  created() {
    if (this.poster) {
      this.title = this.poster.title;
      this.authors = this.poster.authors;
      this.abstract = this.poster.abstract;
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
label,
.label {
  display: block;
  padding-left: 0.75rem;
  margin-bottom: 0.25em;
  font-size: max(0.8rem, 14px);
  font-weight: 700;
  text-transform: uppercase;

  & ~ label {
    margin-top: 1rem;
  }
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: inherit;
  color: var(--darkest);
  background: var(--lightest);
  border: 2px solid transparent;
  border-radius: var(--radius);
  transition: border 0.2s, background 0.2s;

  &:focus {
    background: var(--lighter);
    border: 2px solid var(--teal);
    outline: none;
  }
}

textarea {
  height: 25ch;
}

.badge {
  display: inline-block;
  padding: 0 0.25rem;
  font-size: 0.8em;
  font-weight: normal;
  letter-spacing: 0.5px;
  vertical-align: middle;
  border-radius: var(--radius);
  transform: translateY(-2px);
}

.submit-button {
  margin-top: 1rem;
  button {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.75;
    }
  }
}

.loading {
  margin-left: 0.5em;
}

.helper {
  padding-left: 0.75rem;
  margin-top: 0.25em;
  font-size: 0.8rem;
}
</style>
