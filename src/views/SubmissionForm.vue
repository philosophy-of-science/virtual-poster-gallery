<template>
  <div class="container">
    <h2>Submit Your Poster</h2>
    <div class="grid">
      <form v-on:submit.prevent="onSubmit">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
        <label for="name">Author(s)</label>
        <input type="text" id="name" v-model="name" required />
        <label for="abstract">abstract</label>
        <textarea id="abstract" v-model="abstract" required />
        <label for="topic">Topic</label>
        <select id="topic" v-model="selected" required>
          <!-- inline object literal -->
          <option disabled value="">Please select one</option>
          <option v-for="(topic, i) in topics" :key="i" :value="topic">
            {{ topic.topic }}
          </option>
        </select>
        <label for="image">Poster Image Upload</label>
        <input
          type="file"
          id="image"
          name="filename"
          accept="image/*"
          @change="filesChange($event.target.name, $event.target.files)"
        />
        <Button type="color" class="submit-button">
          <button type="submit">Submit</button></Button
        >
      </form>
      <div class="preview">
        <Card
          :name="name || 'Name'"
          :title="title || 'Poster Title'"
          :abstract="abstract || 'Poster abstract...'"
          :img="previewImage || ''"
          :topic="selected.topic || 'Philosophy of science'"
          :poster="{ name, title }"
          :isPreview="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import supabase from '@/db';
import topics from '@/topics';

export default {
  components: {
    Card,
    Button,
  },

  data() {
    return {
      name: '',
      title: '',
      abstract: '',
      selected: '',
      topics,
      previewImage: null,
      image: '',
    };
  },

  computed: mapState(['user']),

  methods: {
    ...mapActions(['setUser', 'launchToast']),

    async filesChange(...args) {
      const files = args;
      const file = files[1];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file[0]);

      try {
        const { data, error } = await supabase.storage
          .from('poster-img')
          .upload(file[0].name, file[0], {
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
      }
    },

    async onSubmit() {
      console.log('submit');
      if (!this.image) {
        this.launchToast({
          type: 'error',
          show: true,
          content: 'Please wait for the image to upload',
        });
        return;
      }

      try {
        const { data, error } = await supabase.from('posters').insert([
          {
            authors: this.name,
            title: this.title,
            abstract: this.abstract,
            topic: this.selected.topic,
            topic_slug: this.selected.slug,
            image: this.image,
          },
        ]);

        console.log(data, error);

        if (error) throw error;

        const res = await supabase
          .from('profiles')
          .insert([{ id: this.user.id, poster: data[0].id }], { upsert: true });

        console.log({ res });

        this.launchToast({
          type: 'success',
          show: true,
          content: 'Poster uploaded successfully',
        });

        this.$route.push('/profile');
      } catch (error) {
        this.launchToast('error', {
          type: 'error',
          show: true,
          content: error.message,
        });
      }
      // Update state to reflect user has poster
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 1rem 0 3rem;
}
.grid {
  display: grid;
  grid-template-columns: minmax(300px, 400px) minmax(300px, 400px);
  gap: 10rem;
  // justify-content: space-between;
}

.preview {
}
</style>

<style lang="scss">
label,
.label {
  display: block;
  text-transform: uppercase;
  font-size: max(0.8rem, 14px);
  font-weight: 700;
  padding-left: 0.75rem;
  margin-bottom: 0.25em;

  & ~ label {
    margin-top: 1rem;
  }
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  border: 2px solid transparent;
  background: var(--lightest);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
  transition: border 0.2s, background 0.2s;
  color: var(--darkest);

  &:focus {
    border: 2px solid var(--teal);
    background: var(--lighter);
    outline: none;
  }
}

textarea {
  height: 25ch;
}

.badge {
  background: red;
  border-radius: var(--radius);
  padding: 0 0.25rem;
  display: inline-block;
  color: #fff;
  font-weight: normal;
  font-size: 0.8em;
  letter-spacing: 0.5px;
  vertical-align: middle;
  transform: translateY(-2px);
}

.submit-button {
  margin-top: 1rem;
}
</style>
