import FA from "react-fontawesome";
import { useState } from "react";
import { menuSidebar } from "../../data/sidebar.data";
import styles from "./loggedPage.module.scss";

function LoggedPage({ children }) {
    const [indexActive, setIndexActive] = useState(0);
    function handleToggleMenu(index) {
        setIndexActive(indexActive === index ? null : index);
    }
    return (
        <>
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
                                                    <a href="" className={styles.subMenuLink}>{value.name}</a>
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
            {/* <Footer /> */}
        </>
    )
}

export default LoggedPage;