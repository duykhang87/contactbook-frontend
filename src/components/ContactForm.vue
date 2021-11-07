<template>
    <Form>
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field
                name="email"
                type="email"
                class="form-control"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field
                name="phone"
                type="tel"
                class="form-control"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
            />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                type="button"
                class="ml-2 btn btn-danger"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script> 
import * as yup from "yup"; 
import { Form, Field, ErrorMessage } from "vee-validate"; 

export default { 
    name: "ContactForm", 
    components: { 
        Form, 
        Field, 
        ErrorMessage, 
    },
    emits: ["contact-submit", "contact-delete"], 
    props: ["contact"], 
    data() { 
        const schema = yup.object().shape({ 
            name: yup 
                .string() 
                .required("Tên phải có giá trị.") 
                .min(2, "Tên phải ít nhất 2 ký tự.") 
                .max(50, "Tên có nhiều nhất 50 ký tự."), 
            email: yup 
                .string() 
                .email("E-mail không đúng.") 
                .max(50, "E-mail tối đa 50 ký tự."), 
            address: yup
                .string()
                .max(100, "Địa chỉ tối đa 100 ký tự."), 
            phone: yup 
            .string() 
            .matches( 
                /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)? (\d{3})(\s|\.)?(\d{3})$/, 
                "Số điện thoại hợp lệ." 
            ),
        }); 
        //todo /add Contact: Nếu chưa có contact thì gán object mặc định cho nó.
      const newContact = {
         id: '',
         name: '',
         email: '',
         address: '',
         phone: 0,
         favorite: false
      };
        return { 
            contactLocal: this.contact, 
            schema, 
        }; 
    }, 
};
</script>

<style>
 @import "../assets/styles/main.css";
 </style>