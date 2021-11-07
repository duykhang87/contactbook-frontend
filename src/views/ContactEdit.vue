<template>
   <div v-if="contact" class="card my-0 py-0 px-0 col-8">
      <div class="card-header bg-primary text-light">Hiệu chỉnh Liên hệ</div>
      <p v-if="message != ''" class="alert alert-success my-2 mx-4 py-0">{{ message }}</p>
      <ContactForm
         class="card-body my-0 py-0"
         :contact="contact"
         @contact-submit="updateContact"
         @contact-delete="deleteContact"
      />
   </div>
   <div v-else class="card my-0 py-0 px-0 col-8">
      <div class="card-header bg-primary text-light">Thêm Liên hệ</div>
      <p v-if="message != ''" class="alert alert-success my-2 mx-4 py-0">{{ message }}</p>
      <ContactForm class="card-body my-0 py-0" :contact="''" @contact-submit="addContact" />
   </div>
</template>

<script>
import ContactService from '../services/contact.service';
import ContactForm from '../components/ContactForm.vue';
export default {
   name: 'ContactEdit',
   components: { ContactForm },
   data() {
      return { contact: null, message: '' };
   },
   methods: {
      async getContact(id) {
         const [error, response] = await this.handle(ContactService.get(id));
         if (error) {
            console.log(error);
         } else {
            this.contact = response.data;
            console.log(response.data);
         }
      },
      async updateContact(data) {
         const [error, response] = await this.handle(ContactService.update(this.contact.id, data));
         if (error) {
            console.log(error);
         } else {
            console.log(response.data);
            this.message = 'Liên hệ được cập nhật thành công!';
         }
      },
      async deleteContact() {
         const answer = confirm('Xóa liên hệ này?') || false;
         if (answer) {
            const [error, response] = await this.handle(ContactService.delete(this.contact.id));
            if (error) {
               console.log(error);
            } else {
               console.log(response.data);
               this.$router.push({ name: 'ContactBook' });
            }
         }
      },
      async addContact(data) {
         const [error, response] = await this.handle(ContactService.create(data));
         if (error) {
            console.log(error);
         } else {
            console.log(response.data);
            this.message = 'Thêm mới liên hệ thành công!';
         }
      }
   },
   mounted() {
      this.message = '';
      this.getContact(this.$route.params.id);
   }
};
</script>

<style lang="css">
.edit-form {
   max-width: 400px;
   margin: auto;
}
</style>