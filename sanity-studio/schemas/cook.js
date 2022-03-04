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
    {
      title: "Korrektur",
      name: "startCount",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
      initialValue: 0,
    },
  ],
};

export default cook;
