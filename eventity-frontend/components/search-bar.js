import styles from "../styles/SearchBar.module.scss";
import React from "react";
import "@algolia/autocomplete-theme-classic";
import algoliasearch from 'algoliasearch';
import {AiOutlineSearch} from "react-icons/ai";
import {Autocomplete} from "./autocomplete";
import {getAlgoliaResults} from "@algolia/autocomplete-js";
import SearchItem from "./searchItem";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);


const SearchBar = (props) => {
    return (
        <>
            <div className={`hero__button ${props.stylesValue}`}>
                <div
                    className={` `}>
                    <div className="col-md-6">
                        <div className={styles.form}>

                                <Autocomplete
                                    className={`${styles.formInput} form-control`}
                                    openOnFocus={false}
                                    detachedMediaQuery=''
                                    placeholder="Search for artists, venues & events..."
                                    getSources={({query}) => [
                                        {
                                            sourceId: 'events',
                                            getItems() {
                                                return getAlgoliaResults({
                                                    searchClient,
                                                    queries: [{
                                                        indexName: "development_api::event.event",
                                                        query

                                                    }]
                                                })
                                            },
                                            getItemUrl({item}) {
                                                return `/events/${item.slug}`
                                            },
                                            templates: {
                                                item({item, components}) {
                                                    console.log(components)
                                                    return <SearchItem hit={item} components={components}/>
                                                }
                                            }
                                        }

                                    ]}

                                />
                                <span className={`${styles.leftPan}`}></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchBar;


/*
                            <form action="">
                                <i className={styles.formSearch}><AiOutlineSearch/></i>
                                <input type="text" className={`${styles.formInput} form-control`}
                                       placeholder="Search for artists, venues & events..."/>
                                <span className={`${styles.leftPan}`}></span>
                            </form>
*/