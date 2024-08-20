import React, { useContext, useEffect } from 'react'
import { OrderModal, OrdersListContainer } from './OrdersListStyles'
import { PageHeader, PageSearch } from '../../AppStyles'
import { UIContext } from '../../context/UIContext'
import { HomeOrder, HomeOrders, HomeOrderTitles } from '../Home/HomeStyles'
import { BsThreeDots } from 'react-icons/bs'

const OrdersList = () => {

    useEffect(() => {
        selectPage('orders')
    }, [])

    const { darkMode, selectPage, toggleOrderModal } = useContext(UIContext)

    return (
        <OrdersListContainer>
            <PageHeader>
                <p>Orders</p>
            </PageHeader>

            <PageSearch darkMode={darkMode}>
                <input type="text" placeholder='Search by ID or customer name' />
            </PageSearch>

            <HomeOrders>
                <HomeOrderTitles>
                    <p className="products">Product</p>
                    <p className="id">Order ID</p>
                    <p className="date">Date</p>
                    <p className="name">Customer Name</p>
                    <p className="status">Status</p>
                    <p className="amount">Amount</p>
                    <p className="action">View</p>
                </HomeOrderTitles>

                {Array.from({ length: 10 }, (_, index) => (
                    <HomeOrder key={index}>
                        <hr />
                        <div>
                            <p className="products">Sleeveless Hoodie</p>
                            <p className="id">203301</p>
                            <p className="date">01-02-2024</p>
                            <p className="name">Akachukwu Chimadika</p>
                            <p className="status">
                                <div></div>
                                Successful
                            </p>
                            <p className="amount">$250000.00</p>
                            <p className='action' >
                                <div onClick={() => {toggleOrderModal()}}>
                                    Details
                                </div>
                            </p>
                        </div>
                    </HomeOrder>
                ))}
            </HomeOrders>

        </OrdersListContainer>
    )
}

export default OrdersList
