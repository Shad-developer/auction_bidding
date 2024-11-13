import React from 'react'
import { Container, Heading } from '../common/Design'
import CategoryCard from '../cards/CategoryCard'
import { categorylists } from '../../assets/data'

const CategorySlider = () => {
  return (
    <>
      <section className="category-slider pb-16">
        <Container>
          <Heading title="Browse the Categories" subtitle="Most viewd and all-top seller Category"/>

          <div className="grid  grid-cols-2 md:grid-cols-5 gap-5 my-8">
            {
              categorylists.map(item=>(
                <CategoryCard key={item.id} item={item}/>
              ))

            }
     
          </div>
        </Container>
      </section>
    </>
  )
}

export default CategorySlider
