import styles from "../styles/SearchBar.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import React from "react";

const SearchBar = (props) => {
    return (
        <>
            <div className={`hero__button ${props.stylesValue}`}>
                <div
                    className={` `}>
                    <div className="col-md-6">
                        <div className={styles.form}>
                            <form action="">
                                <i className={styles.formSearch}><AiOutlineSearch/></i>
                                <input type="text" className={`${styles.formInput} form-control`}
                                       placeholder="Search for artists, venues & events..."/>
                                <span className={`${styles.leftPan}`}></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchBar;
