const dish = {
  title: "Gericht",
  name: "dish",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Gang",
      name: "course",
      type: "string",
      options: {
        list: [
          { title: "Vorspeise", value: "starter" },
          { title: "Hauptgang", value: "main" },
          { title: "Dessert", value: "dessert" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Vegetarisch",
      name: "veggie",
      type: "boolean",
      initialValue: false,
      options: {
        layout: "checkbox",
      },
    },
    {
      title: "Foto",
      name: "image",
      type: "image",
    },
    {
      title: "Rezepte",
      name: "recipes",
      type: "array",
      of: [{ type: "url" }],
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      options: {
        sortable: false,
      },
      validation: (Rule) => Rule.unique().required(),
    },
    {
      title: "Rating",
      name: "rating",
      type: "array",
      of: [{ type: "number" }],
      readOnly: true,
    },
  ],
};

export default dish;
