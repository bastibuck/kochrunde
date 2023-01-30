export type UpcomingCooksResult = {
  _id: string;
  name: string;
}[];

export const maxEventsCount = `
    *[_type == "cook"] {
          "maxCount": *[_type == "cook"] {
            "eventCount": count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)])
          } | order(eventCount desc)[0].eventCount,
    } | order(maxCount desc)[0].maxCount
  `;

export const upcomingCooksQuery = `
    *[_type == "cook" && count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)]) + startCount < $maxCount ] {
        _id,
        name
    } | order(name)
`;
