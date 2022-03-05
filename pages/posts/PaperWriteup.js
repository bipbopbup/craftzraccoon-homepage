import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/post'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Post = () => (
  <Layout title="Paper Writeup">
    <Container>
      <Title>
        Paper Machine Writeup <Badge>2022</Badge>
      </Title>
      <P>
      This easy-rated machine will test your pentesting linux skills aswell as make you laugh hard if you have seen the aclaimed 
	TV show &apos;The Office&apos;. This is my first writeup too! From now on, I&apos;ll try to post one every week to improve my pentesting 
	skills and hopefully to help you too!
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://app.hackthebox.com/machines/Paper">
            https://www.hackthebox.com/machines/Paper <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Hack The Box</span>
        </ListItem>
        <ListItem>
          <Meta>Skills</Meta>
          <span>Directory and Subdomain fuzzing, Priviledge Escalation, Reverse Shells</span>
        </ListItem>
        <ListItem>
          <Meta>Difficulty</Meta>
          <span> 4/10 </span>
        </ListItem>
      </List>

      <WorkImage src="/images/posts/Paperlogo.png" alt="Paperlogo" />
      <P>
	First we ping the target IP to check the connection and then we nmap the target.
	We will also type curl -IL 10.10.11.143 to extract some basic information. 
	</P>
	<WorkImage src="/images/posts/Paper/Paper1.png" alt="PaperNmap" />
	<WorkImage src="/images/posts/Paper/Paper11.png" alt="PapercurlIL" />
	<P> As we can see, the back-end server is called office.paper. Browsing into 10.10.11.143 doesn&apos;t provide us with much info
	so we will add the line "10.10.11.143 office.paper" to our /etc/hosts file. Now we can navigate to office.paper and continue
	our investigation. Soon we will find our first clues:</P>
	<WorkImage src="/images/posts/Paper/Paper2.png" alt="PaperClue" />
	<P>Fuzzing directories and subdomains of 10.10.11.143 doesn&apos;t work, so we will try the same for the domain we just
	added, i.e., office.paper.</P>
	<WorkImage src="/images/posts/Paper/Paper4.png" alt="PaperChat"/>
	
	<P> Adding chat.office.paper to the /etc/hosts file next to office.paper allow us to navigate there, which leads us to
	a chat website that requires us a username and a password. After verifying we can&apos;t SQL inject anything in it, we will
	try another approach. The clue we saw earlier in office.paper talked about a draft message being insecure. We will check
	the Wordpress version and its vulnerabilities with google and WPScan.</P>
	
	<WorkImage src="/images/posts/Paper/Paper5.png" alt="PaperWPScan" />
	<P>Googling the issue reveals the next Wordpress 5.2.3 vulnerability: </P>
	<Link href="https://wpscan.com/vulnerability/3413b879-785f-4c9f-aa8a-5a4a1d5e0ba2"> https://wpscan.com/vulnerability/3413b879-785f-4c9f-aa8a-5a4a1d5e0ba2
	<ExternalLinkIcon mx="2px"/></Link>
	<P>So navigating to office.paper/?static=1 reveal us some messages with a "Secret Registration URL" :D </P>
	<WorkImage src="/images/posts/Paper/Paper6.png" alt="PaperRegistrationLink" />
	
	<P>After signing up to the chat link, we can access it and talk to the Recyclops bot, which is our main objective here. We will soon realize that this
	bot allows us to execute commands from a chat, like list (ls) and file (cat). This way we can trick the bot doing things like "recyclops file ../../somesecret.js"
	to access some interesting files and learning more about this bot looking into its code, which will be reported to us in the chat. After a while we can learn that
	it is possible to execute almost every command using "recyclops run ..." so we can throw a reverse shell.</P>
	<P>Once you are in the reverse shell, it would be nice to upgrade it to a proper console. I&apos;ve used the following method:</P>
	<WorkImage src="/images/posts/Paper/Paper7.png" alt="PaperUpgradeShell" />
	<P>We can quickly cat the user flag, which is in the user directory. Now let&apos;s root this machine!</P>
	<P>We will need to get files from our computer to the target machine since it doesn&apos;t allow clonning repositories from github. I&apos;ve used nc to transfer those files. 
	I tried to use the CVE-2021-4034 exploit to get root, but sadly pwnkit has been fixed in this machine...</P>
	<WorkImage src="/images/posts/Paper/Paper8.png" alt="PaperPwnkit" />
	
	<P>Let&apos;s execute LinPeas to know exactly what vulnerabilities this target has.</P>
	<Link href="https://github.com/carlospolop/PEASS-ng"> https://github.com/carlospolop/PEASS-ng <ExternalLinkIcon mx="2px"/> </Link>
	<P>D-Bus section shows Polkit, another vulnerability called CVE-2021-3560. Trying to execute it from the github page and compiling it is no use.</P>
	<WorkImage src="/images/posts/Paper/Paper9.png" alt="PaperCVE3560" />
	
	<P>More research shows us that there is a bash version of this exploit automatized by the same creator of this machine!</P>
	<Link href="https://github.com/secnigma/CVE-2021-3560-Polkit-Privilege-Esclation"> https://github.com/secnigma/CVE-2021-3560-Polkit-Privilege-Esclation 
	<ExternalLinkIcon mx="2px"/> </Link>
	<WorkImage src="/images/posts/Paper/Paper10.png" alt="PaperCVE3560_2" />
	<P> Finally the root flag is ours!</P>

    </Container>
  </Layout>
)

export default Post
