import FA from "react-fontawesome";
import { LoggedPageContext } from "../../context/LoggedPageContext";
import { useState, useContext, useRef } from "react";
import { menuSidebar } from "../../data/sidebar.data";
import styles from "./loggedPage.module.scss";
import { NavLink  } from "react-router-dom";
import Loadding from "./Loading";
import SnackbarComponent from "./SnackbarComponent";

function LoggedPage({ children }) {
    const [indexActive, setIndexActive] = useState(0);
    const loggedRef = useRef({});
    function handleToggleMenu(index) {
        setIndexActive(indexActive === index ? null : index);
    }
    return (
        <LoggedPageContext.Provider value={loggedRef}>
            {/* <Header /> */}
            <div className={styles.wpContent}>
                <div className={styles.sidebar}>
                    <div className={styles.topSidebar}>
                        <a href="" className={styles.logo}>
                            <img src="https://eidai.com.vn/img/Untitled-1-1.png" alt="" />
                        </a>
                    </div>
                    <ul className={styles.menuSidebar}>
                        {
                            menuSidebar.map((value, index) => {
                                return (<li key={index} className={[styles.menuItem, indexActive == index ? styles.active : null].join(" ")}>
                                    <a href="" className={styles.menuLink}>
                                        <div className={styles.menuLinkLeft}>
                                            <FA name={value.icon} className={styles.menuIcon} />
                                            <span className={styles.menuTitle}>{value.name}</span>
                                        </div>
                                        <FA name="chevron-down"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleToggleMenu(index)
                                            }}
                                            className={[styles.menuIcon, styles.iconActive].join(" ")} />
                                    </a>
                                    <ul className={styles.subMenu}>
                                        {
                                            value.childrens.map((value, index) => {
                                                return (<li key={index} className={styles.subMenuItem}>
                                                    <NavLink  to={value.route}
                                                        className={({ isActive }) => {
                                                            return (isActive ? styles.active : null)
                                                        }}>{value.name}</NavLink >
                                                </li>)
                                            })
                                        }
                                    </ul>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            {/* <Loadding /> */}
            <SnackbarComponent/>
            {/* <Footer /> */}
        </LoggedPageContext.Provider>
    )
}

export default LoggedPage;