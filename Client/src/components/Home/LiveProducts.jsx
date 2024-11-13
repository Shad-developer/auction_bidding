import React from 'react'
import { Container, Heading } from '../common/Design'
import { productlists } from '../../assets/data'
import ProductCard from '../cards/ProductCard'

export const LiveProducts = ({products}) => {
  return (
    <section className='product-home'>
      <Container>
        <Heading title="Live Auction" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, consequuntur ad.
"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8">
            {products?.slice(0,12)?.map(
              (item,index)=>(
                <ProductCard item={item} key={index} />
              )
            )}
          </div>
      </Container>
    </section>
  )
}

