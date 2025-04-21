<template>
    <editor
      api-key="f27er7r2ri3axhqp1hncn1a0jvadeweybwzv2bt061ctonq0"
      :init="{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | ' +
          'bullist numlist outdent indent | ' +
          'removeformat | help | code',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }"
      v-model="content"
    ></editor>
  </template>
   
  <script>
  
  import Editor from '@tinymce/tinymce-vue';
   
  export default {
    components: {
      Editor
    },
    data() {
      return {
        content: '<p>Initial content</p>'
      };
    }
  }
  </script>
  <style>

  </style>