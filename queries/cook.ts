export type UpcomingCooksResult = {
  _id: string;
  name: string;
}[];

export const upcomingCooksQuery = `
    { 
  "cooks": *[_type == "cook"] { 
  _id,
  name, 
  startCount, 
  "eventCount": count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)]) 
} | { 
  ..., 
  "totalEventCount": startCount + eventCount 
} | order(eventCount desc)} | { 
  ..., 
  "highestEventCount": cooks[0].totalEventCount 
} | { 
  "filtered": cooks[totalEventCount < ^.highestEventCount] {
  _id, 
  name
} 
}.filtered | order(name)
`;
