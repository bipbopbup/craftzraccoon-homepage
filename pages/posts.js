import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { PostGridItem } from '../components/grid-item'

import thumbPaperWriteup from '../public/images/posts/Paperlogo.png'
import thumbMyDeskSetup from '../public/images/contents/youtube-my-desk-setup.jpg'
import thumb500PaidUsers from '../public/images/contents/blog-500-paid-users.jpg'
import thumbFinancialGoal from '../public/images/contents/blog-financial-goal.png'
import thumbHowToPriceYourself from '../public/images/contents/blog-how-to-price-yourself.jpg'
import thumb50xFaster from '../public/images/contents/youtube-50x-faster.jpg'

const Posts = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Popular Posts
      </Heading>

      <Section delay={0.1}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>

          <PostGridItem
            id="PaperWriteup"
            title="Hack The Box - Paper Writeup"
            thumbnail={thumbPaperWriteup}
          >
          My approach to Paper machine.
          </PostGridItem>

          <GridItem
            title="Coming soon..."
            thumbnail={thumbMyDeskSetup}
            href=""
          />
        </SimpleGrid>
      </Section>

      <Section delay={0.3}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="Coming soon..."
            thumbnail={thumb500PaidUsers}
            href=""
          />
          <GridItem
            title="Coming soon..."
            thumbnail={thumbFinancialGoal}
            href=""
          />
        </SimpleGrid>
      </Section>

      <Section delay={0.5}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="Coming soon..."
            thumbnail={thumbHowToPriceYourself}
            href=""
          />
          <GridItem
            title="Coming soon..."
            thumbnail={thumb50xFaster}
            href=""
          />
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Posts
