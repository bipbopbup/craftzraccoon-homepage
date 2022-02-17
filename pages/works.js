import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbInkdrop from '../public/images/works/chuchinator.jpg'
import thumbWalknote from '../public/images/works/ml-lasso.jpg'
import thumbFourPainters from '../public/images/works/the-four-painters_eyecatch.jpg'
import thumbMenkiki from '../public/images/works/menkiki_eyecatch.png'
import thumbModeTokyo from '../public/images/works/modetokyo_eyecatch.png'
import thumbStyly from '../public/images/works/styly_eyecatch.png'
import thumbPichu2 from '../public/images/works/pichu2_eyecatch.png'
import thumbFreeDBTagger from '../public/images/works/freedbtagger_eyecatch.png'
import thumbAmembo from '../public/images/works/amembo_eyecatch.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="chuchinator" title="Chuchinator" thumbnail={thumbInkdrop}>
            A Convolutional Neural Network which classifies two cats (Chuchi and Ronnie)
	    with data augmentation given an image.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem
            id="lasso"
            title="Healthcare Cost Estimator"
            thumbnail={thumbWalknote}
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
            thumbnail={thumbFourPainters}
          >
          Coming soon...
	</WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem id="menkiki" thumbnail={thumbMenkiki} title="Coming soon...">
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
            thumbnail={thumbModeTokyo}
            title="Coming soon..."
          >
            Coming soon...
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem id="styly" thumbnail={thumbStyly} title="Coming soon...">
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
          <WorkGridItem id="pichu2" thumbnail={thumbPichu2} title="Coming soon...">
            Coming soon...
          </WorkGridItem>
        </Section>
        <Section delay={0.5}>
          <WorkGridItem
            id="freedbtagger"
            thumbnail={thumbFreeDBTagger}
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
