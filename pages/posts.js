import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { PostGridItem } from '../components/grid-item'

import thumbPaperWriteup from '../public/images/posts/Paperlogo.png'
import thumbOpenSource from '../public/images/posts/OpenSourcelogo.jpeg'
import thumbHTBlogo from '../public/images/posts/hacktheboxlogo.png'
import thumbShared from '../public/images/posts/Sharedlogo.png'

const Posts = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Popular Posts
      </Heading>

      <Section delay={0.1}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <PostGridItem
            id="SharedWriteup"
            title="Hack The Box - Shared Writeup"
            thumbnail={thumbShared}
          >
          </PostGridItem>
          <PostGridItem
            id='OpenSourceWriteup'
            title="Hack The Box - OpenSource Writeup"
            thumbnail={thumbOpenSource}
          >
          </PostGridItem>

        </SimpleGrid>
      </Section>

      <Section delay={0.3}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
        <PostGridItem
            id="PaperWriteup"
            title="Hack The Box - Paper Writeup"
            thumbnail={thumbPaperWriteup}
          >
          </PostGridItem>
          <GridItem
            title="Coming soon..."
            thumbnail={thumbHTBlogo}
            href=""
          />
        </SimpleGrid>
      </Section>

      <Section delay={0.5}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="Coming soon..."
            thumbnail={thumbHTBlogo}
            href=""
          />
          <GridItem
            title="Coming soon..."
            thumbnail={thumbHTBlogo}
            href=""
          />
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Posts
