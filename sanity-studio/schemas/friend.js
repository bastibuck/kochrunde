export default {
  title: "Freunde",
  name: "friend",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      title: "Profilfoto",
      name: "profile_picture",
      type: "image",
    },
  ],
};
