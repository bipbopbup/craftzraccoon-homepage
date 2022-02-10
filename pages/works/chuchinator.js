import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Chuchinator">
    <Container>
      <Title>
        Chuchinator <Badge>2021</Badge>
      </Title>
      <P>
         A Convolutional Neural Network which classifies two cats (Chuchi and Ronnie).
	 The dataset has been preprocessed with data augmentation to ensure its functionality.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://github.com/bipbopbup/Convolutional-Cat-Classifier">
            https://github.com/bipbopbup/Convolutional-Cat-Classifier <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Google Colab</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Python</span>
        </ListItem>
        <ListItem>
          <Meta>Blogpost</Meta>
          <Link href="">
            Coming soon...
             <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      <WorkImage src="/images/works/chuchinator2.png" alt="chuchinator" />
      <WorkImage src="/images/works/chuchinator3.png" alt="lasso" />
    </Container>
  </Layout>
)

export default Work
