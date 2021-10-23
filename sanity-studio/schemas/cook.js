const cook = {
  title: "Koch",
  name: "cook",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default cook;
