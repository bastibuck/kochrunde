export type UpcomingCooksResult = {
  _id: string;
  name: string;
}[];

// TODO? can this query by optimised as we query the samw thing twice?
export const upcomingCooksQuery = `
    select(
        count(
            *[_type == "cook" && 
            *[_type == "cook"] {"eventCount": count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)])} | order(eventCount desc)[0].eventCount > 
                count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)]) + startCount
            ] {
            _id
        }) > 0 => *[
            _type == "cook" && 
            *[_type == "cook"] {"eventCount": count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)])} | order(eventCount desc)[0].eventCount > 
                count(*[_type == 'event' && !(_id in path("drafts.**")) && references(^._id)]) + startCount
        ] {
            _id,
            name
        } | order(name)
    ,
        *[_type == "cook"] {
                _id,
                name
            } | order(name)
    )

`;
