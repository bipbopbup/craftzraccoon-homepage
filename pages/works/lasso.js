import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Healthcare Costs Predictor">
    <Container>
      <Title>
        Healthcare Costs Predictor <Badge>2021</Badge>
      </Title>
      <P>
         Colab Notebook with an extensive analysis and data preprocessing used to
	 implement a ML Model which predicts healthcare costs.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://github.com/bipbopbup/Machine-Learning-Private-Healthcare-Cost-Prediction">
            https://github.com/bipbopbup/Machine-Learning-Private-Healthcare-Cost-Prediction <ExternalLinkIcon mx="2px" />
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

      <WorkImage src="/images/works/ml-lasso.jpg" alt="lasso" />
      <WorkImage src="/images/works/ml-lasso_02.png" alt="lasso" />
    </Container>
  </Layout>
)

export default Work
