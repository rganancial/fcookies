import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc } from 'firebase/firestore'

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        document.title = "fCookies || Home";
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const data = await getDocs(collection(db, "categories"));
            setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getCategories();
    });

    return (
        <div className="fc-home">
            <strong>Categories</strong>
            <ul>
                {categories.length ?
                    (
                        categories.map((category) => (
                            <li key={category.id} className="fc-category">
                                {category.name}
                            </li>
                        ))
                    ): (
                        <li>Loading...</li>
                    )
                }
            </ul>
        </div>
    )
}

export default Home