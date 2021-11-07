<template>
   <div class="list row offset-2">
      <div class="col-md-10">
         <div class="mb-3 input-group">
            <input
               type="text"
               class="form-control"
               placeholder="Tìm theo tên"
               v-model="nameToSearch"
            />
            <div class="input-group-append">
               <button
                  class="btn btn-outline-secondary bg-dark text-light"
                  type="button"
                  @click="searchName"
               >
                  Tìm kiếm
               </button>
            </div>
         </div>
         <div v-if="answerCount != 0" class="alert alert-success">
            Tìm thấy {{ answerCount }} liên hệ thỏa mãn
         </div>
      </div>
      <div class="col-12 col-md-5">
         <h4 class="text-center"><i class="fas fa-address-book"> Danh bạ</i></h4>
         <ul class="list-group">
            <li
               style="cursor: pointer"
               class="list-group-item"
               :class="{ active: index == currentIndex }"
               v-for="(contact, index) in contacts"
               :key="contact.id"
               @click="setActiveContact(contact, index)"
            >
               {{ contact.name }}
            </li>
         </ul>

         <button class="mt-3 btn btn-sm btn-primary" @click="goToAddContact">
            Thêm Liên hệ
         </button>
         <button class="mt-3 ml-2 btn btn-sm btn-danger" @click="removeAllContacts">
            Xóa tất cả
         </button>
      </div>
      <div class="col-12 col-md-5">
         <div v-if="currentContact">
            <ContactDetails :contact="currentContact" />
            <router-link :to="'/contacts/' + currentContact.id">
               <span class="badge badge-warning">Hiệu chỉnh</span>
            </router-link>
         </div>
         <div v-else>
            <h4 class="text-center"><i class="fas fa-address-card"> Chi tiết liên hệ</i></h4>
            <div class="row">
               <h6 class="mb-2 col-12 text-center">Chọn liên hệ để xem thông tin</h6>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import ContactDetails from '../components/ContactDetails';
import ContactService from '../services/contact.service';
export default {
   name: 'ContactBook',
   components: {
      ContactDetails
   },
   data() {
      return {
         contacts: [],
         currentContact: null,
         currentIndex: -1,
         nameToSearch: '',
         answerCount: 0
      };
   },
   methods: {
      setActiveContact(contact, index) {
         this.currentContact = contact;
         this.currentIndex = contact ? index : -1;
      },
      async retrieveContacts() {
         const [error, response] = await this.handle(ContactService.getAll());
         if (error) {
            console.log(error);
         } else {
            this.contacts = response.data;
            console.log(response.data);
         }
      },
      refreshList() {
         this.retrieveContacts();
         this.currentContact = null;
         this.currentIndex = -1;
      },
      async removeAllContacts() {
         const answer = confirm('Xóa tất cả liên hệ?') || false;
         if (answer) {
            const [error, response] = await this.handle(ContactService.deleteAll());
            if (error) {
               console.log(error);
            } else {
               console.log(response.data);
               this.refreshList();
            }
         }
      },
      goToAddContact() {
         this.$router.push('/add');
      },
      async searchName() {
         const [error, response] = await this.handle(ContactService.findByName(this.nameToSearch));
         if (error) {
            console.log(error);
         } else {
            this.contacts = response.data;
            this.setActiveContact(null);
            this.answerCount = response.data.length;
            console.log(response.data);
         }
      }
   },
   mounted() {
      this.retrieveContacts();
   }
};
</script>
<style>
.list {
   text-align: left;
   margin: 0 auto;
}
</style>