const tag = {
  title: "Schlagworte",
  name: "tag",
  type: "document",
  fields: [
    {
      title: "Tag",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Synonym",
      name: "synonym",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.unique(),
    },
  ],
};

export default tag;
