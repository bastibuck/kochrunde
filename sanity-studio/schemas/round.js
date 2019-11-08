export default {
  title: "Runden",
  name: "round",
  type: "document",

  fields: [
    {
      title: "Titel",
      name: "title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      title: "Datum",
      name: "date",
      type: "datetime",

      options: {
        dateFormat: "DD.MM.YYYY",
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Koch",
      name: "cook",
      type: "reference",

      to: [{ type: "friend" }],
      validation: Rule => Rule.required(),
    },
    {
      title: "Saison",
      name: "season",
      type: "reference",
      to: [{ type: "season" }],
      validation: Rule => Rule.required(),
    },
    {
      title: "Gerichte",
      name: "dishes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "dish" }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: "Datum, absteigend",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Datum, aufsteigend",
      name: "dateDesc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Koch, A-Z",
      name: "cookAsc",
      by: [{ field: "cook.name", direction: "asc" }],
    },
    {
      title: "Koch, Z-A",
      name: "cookDesc",
      by: [{ field: "cook.name", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      cook: "cook.name",
    },
    prepare(selection) {
      const { title, date, cook } = selection;
      const dateLocalized = new Date(date).toLocaleDateString("de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return {
        title,
        subtitle: `${dateLocalized} | ${cook}`,
      };
    },
  },
};
