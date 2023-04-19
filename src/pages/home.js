import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const generateLuckyNumbers = () => {
        const size = 6,
            lowest = 1,
            highest = 49;
        let numbers = [];
        for (let i = 0; i < size; i++) {
            let add = true;
            let randomNumber = Math.floor(Math.random() * highest) + 1;
            for (let y = 0; y < highest; y++) {
                if (numbers[y] == randomNumber) {
                    add = false;
                }
            }
            if (add) {
                numbers.push(randomNumber);
            } else {
                i--;
            }
        }

        let highestNumber = 0;
        for (let m = 0; m < numbers.length; m++) {
            for (let n = m + 1; n < numbers.length; n++) {
                if (numbers[n] < numbers[m]) {
                    highestNumber = numbers[m];
                    numbers[m] = numbers[n];
                    numbers[n] = highestNumber;
                }
            }
        }
        return numbers;
    };

    useEffect(() => {
        document.title = "fCookies || Home";
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const data = await getDocs(collection(db, "categories"));
            setCategories(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getCategories();
    }, []);

    return (
        <div className="fc-home">
            <strong>Categories</strong>
            <ul>
                {categories.length ? (
                    categories.map((category) => (
                        <li key={category.id} className="fc-category">
                            {category.name}
                        </li>
                    ))
                ) : (
                    <li>Loading...</li>
                )}
            </ul>

            <div className="fortune">
                <div className="fortune-top">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                <div className="fortune-body">
                    <div className="fortune-text box">
                        This is the fortune text.
                    </div>
                    <div className="fortune-lucky-numbers box">
                        <strong>Lucky Numbers: </strong>
                        <span className="fortune-lucky-numbers-text">
                            {generateLuckyNumbers().join("-")}
                        </span>
                    </div>
                </div>
                <div className="fortune-bottom">
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
            </div>
        </div>
    );
};

export default Home;
