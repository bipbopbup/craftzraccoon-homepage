import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbChuchinator from '../public/images/works/chuchinator.jpg'
import thumbMLasso from '../public/images/works/ml-lasso.jpg'
import thumbAmembo from '../public/images/works/amembo_eyecatch.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="chuchinator" title="Chuchinator" thumbnail={thumbChuchinator}>
            A Convolutional Neural Network which classifies two cats (Chuchi and Ronnie)
	    with data augmentation given an image.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem
            id="lasso"
            title="Healthcare Cost Estimator"
            thumbnail={thumbMLasso}
          >
            A Machine Learning predictor for healthcare total cost with high accuracy... 
	    using, Lasso, a Linear Model! This proves that with a smart data preprocessing you
	    can achieve great results with low computational cost.
          </WorkGridItem>
        </Section>
	
        <Section delay={0.1}>
          <WorkGridItem
            id="fourpainters"
            title="Coming soon..."
            thumbnail={thumbAmembo}
          >
          Coming soon...
	</WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem id="menkiki" thumbnail={thumbAmembo} title="Coming soon...">
          Coming soon...
	</WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Collaborations
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.3}>
          <WorkGridItem
            id="modetokyo"
            thumbnail={thumbAmembo}
            title="Coming soon..."
          >
            Coming soon...
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem id="styly" thumbnail={thumbAmembo} title="Coming soon...">
            Coming soon...
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.4}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Old works
        </Heading>
      </Section>
	
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.5}>
          <WorkGridItem id="pichu2" thumbnail={thumbAmembo} title="Coming soon...">
            Coming soon...
          </WorkGridItem>
        </Section>
        <Section delay={0.5}>
          <WorkGridItem
            id="freedbtagger"
            thumbnail={thumbAmembo}
            title="Coming soon..."
          >
            Coming soon...
          </WorkGridItem>
        </Section>
        <Section delay={0.6}>
          <WorkGridItem id="amembo" thumbnail={thumbAmembo} title="Coming soon...">
            Coming soon...
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      
    </Container>
  </Layout>
)

export default Works
