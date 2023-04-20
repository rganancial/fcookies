import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    collectionGroup,
    getDocs,
    getDoc,
    doc,
    where,
    query,
    getCountFromServer,
    onSnapshot
} from "firebase/firestore";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        "x5lqNi6x70igG4WewJM6"
    );
    const [selectedSlug, setSelectedSlug] = useState("");
    const [fortune, setFortune] = useState({});

    const handleCategoryChange = (event) => {
        const id = event.target.value;
        setSelectedCategory(id);
    };

    const handleCookieOpen = (event) => {
        setIsOpen(true);
    };

    const handleCloseFortune = (event) => {
        setIsOpen(false);
    };

    const generateLuckyNumbers = () => {
        const result = [];
        const random = (min, max) =>
            min + Math.floor((max - min) * Math.random());

        for (let count = 0; count < 6; count++) {
            let rand;
            do {
                rand = random(0, 69);
            } while (result.includes(random));
            result.push(rand);
        }

        setNumbers(result);
    };

    const getFortune = async () => {
        const collectionRef = collection(
            db,
            "categories",
            selectedCategory,
            "fortunes"
        );

        onSnapshot(collectionRef, (querySnapshot) => {
            const random = Math.floor(Math.random() * querySnapshot.size);
            const fortune = querySnapshot.docs[random].data();
            setFortune(fortune);
        });
    };

    useEffect(() => {
        if (categories.length && selectedCategory) {
            setSelectedSlug(
                categories.filter((c) => c.id === selectedCategory)[0].slug
            );
        } else {
            setSelectedSlug("");
        }
    }, [categories, selectedCategory]);

    useEffect(() => {
        let fcookie = document.querySelector("#fc-cookie").classList,
            fortune = document.querySelector("#fortune").classList,
            spawned = "spawned",
            opened = "opened",
            hide = "hide";

        if (isOpen) {
            fcookie.remove(spawned);
            fcookie.add(opened);
            generateLuckyNumbers();
            getFortune();
            setTimeout(() => {
                fcookie.add(hide);
            }, 500);
        } else {
            setTimeout(() => {
                fcookie.remove(opened);
                fcookie.add(spawned);
                fcookie.remove(hide);
                fortune.add(hide);
            }, 200);
        }
    }, [isOpen]);

    useEffect(() => {
        document.title = "fCookies || Home";
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await getDocs(collection(db, "categories"));

                setCategories(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            } catch (err) {
                console.log(err.error);
            }

            setLoading(false);
        };
        getCategories();
    }, []);

    return (
        <Container className="fc-home" maxWidth="sm">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="fc-categories-label">Categories</InputLabel>
                    <Select
                        labelId="fc-categories-label"
                        id="fc-categories"
                        value={selectedCategory}
                        label="Categories"
                        onChange={handleCategoryChange}
                    >
                        {categories.length ? (
                            categories
                                .sort((a, b) => {
                                    if (a === "" || a === null) return -1;
                                    if (b === "" || b === null) return 1;
                                    if (a === b) return 0;
                                    return a.displayOrderOverride <
                                        b.displayOrderOverride
                                        ? -1
                                        : 1;
                                })
                                .map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))
                        ) : loading ? (
                            <MenuItem value="">Loading...</MenuItem>
                        ) : (
                            <MenuItem value="">Coming soon...</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>

            <Zoom in={!loading}>
                <button
                    id="fc-cookie"
                    className="fc-cookie spawned"
                    type="button"
                    onClick={handleCookieOpen}
                >
                    <div className="fc-part left"></div>
                    <div className="fc-part right"></div>
                    <div className="fc-crumbs">
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                        <div className="fc-crumb"></div>
                    </div>
                </button>
            </Zoom>

            <Zoom
                in={isOpen}
                style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
            >
                <Paper
                    className="fortune"
                    id="fortune"
                    elevation={5}
                    onClick={handleCloseFortune}
                >
                    <div className="fortune-top">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <div className="fortune-body">
                        <div className="fc-fortune-text box">
                            {fortune.fortuneText}
                        </div>
                        <div className="fc-lucky-numbers box">
                            <strong>Lucky Numbers: </strong>
                            <span className="fortune-lucky-numbers-text">
                                {numbers.join("-")}
                            </span>
                        </div>
                    </div>
                    <div className="fortune-bottom">
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </Paper>
            </Zoom>
        </Container>
    );
};

export default Home;
