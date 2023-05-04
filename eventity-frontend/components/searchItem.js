import React from "react";

const SearchItem = ({ hit, components }) => {
    console.log(hit)
    console.log(components)

    return(
        <a className="aa-ItemLink" href={`/events/${hit.slug}`}>
            <div className="aa-ItemContent">
                <div className="ItemCategory">{hit.organizer}</div>
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                        <components.Highlight hit={hit} attribute="title" />
                    </div>
                    <div className="aa-ItemContentDescription">
                        <components.Highlight hit={hit} attribute="description" />
                    </div>

                </div>
            </div>
        </a>

    )
}

export default SearchItem