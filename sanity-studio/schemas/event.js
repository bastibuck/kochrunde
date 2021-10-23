const event = {
  title: "Event",
  name: "event",
  type: "document",

  fields: [
    {
      title: "Datum",
      name: "date",
      type: "datetime",

      options: {
        dateFormat: "DD.MM.YYYY",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Koch",
      name: "cook",
      type: "reference",

      to: [{ type: "cook" }],
      validation: (Rule) => Rule.required(),
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
      date: "date",
      cook: "cook.name",
    },
    prepare(selection) {
      const { date, cook } = selection;
      const dateLocalized = new Date(date).toLocaleDateString("de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return {
        title: `${dateLocalized} | ${cook}`,
      };
    },
  },
};

export default event;
