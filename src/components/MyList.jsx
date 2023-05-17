import React from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import ExploreAllCard from './ExploreAllCard';


const MyList = () => {
    const { myList } = useSelector(state => state.list);

    const dispatch = useDispatch();

    const listClear = () => {
        dispatch({
            type: "clearList",
        })
    }

    const deleteHandler = (id) => {
        dispatch({
            type:"deleteFromList",
            payload: id
        })
    }

    return (
        <>
            <Header pos={"fixed"} />
            <section id='myListSec' className='container'>

                <Button style={{ marginTop: '6rem' }} variant={'solid'} onClick={listClear} cursor={'pointer'} backgroundColor={"#e50914"}  >Clear All</Button>


                <div className='exploreNowCon'>
                    {
                        myList.length > 0 && myList.map((i) => {
                            return (
                                <>
                                    <div style={{marginTop:"4rem"}} ></div>
                                    <ExploreAllCard deleteHandler={deleteHandler} plusDisplay={"none"} img={i.img} name={i.name.slice(0, 15)} id={i.id} rating={i.rating} release={i.release} />
                                </>
                            );
                        })
                    }

                </div>
            </section>

        </>
    )
}

export default MyList