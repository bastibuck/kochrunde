export default {
  title: "Saison",
  name: "season",
  type: "document",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "string",
      validation: Rule => Rule.required(),
    },
  ],
};
