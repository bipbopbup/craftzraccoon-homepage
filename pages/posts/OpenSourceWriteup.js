import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/post'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Post = () => (
  <Layout title="OpenSource Writeup">
    <Container>
      <Title>
        OpenSource Machine Writeup <Badge>2022</Badge>
      </Title>
      <P>
      This easy-rated machine includes reverse shells in linux, a fun little puzzle, escaping from a docker container and much more!
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://app.hackthebox.com/machines/OpenSource">
            https://www.hackthebox.com/machines/OpenSource <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Hack The Box</span>
        </ListItem>
        <ListItem>
          <Meta>Skills</Meta>
          <span> Git repositories, Priviledge Escalation, Reverse Shells, Docker Basics</span>
        </ListItem>
        <ListItem>
          <Meta>Difficulty</Meta>
          <span> 4/10 </span>
        </ListItem>
      </List>

      <WorkImage src="/images/posts/OpenSourcelogo.jpeg" alt="OpenSource" />
      <P>
	First we ping the target IP to check the connection and then we nmap the target. I use nmap -p- --min-rate 5000 --open -vvv -n -Pn 10.10.11.164 -oG allPorts
	to perform a quick scan and export the info to a file called allPorts.
	I also recommend executing curl -IL 10.10.11.164 to extract the HTTP header and the current location.
	</P>
	<WorkImage src="/images/posts/OpenSource/banners.png" alt="banners" />
	<P> Only ports 22 and 80 are open. I therefore navigate to the IP address, where two things get my attention. First of all I can download some sourcecode. I can also execute it remotely on this web.
	Let&apos;s see what we can find fuzzing the directories with gobuster dir -u http://10.10.11.164/ -w /your/path/to/wordlist.txt 

	</P>
	<WorkImage src="/images/posts/OpenSource/gobuster-dir.png" alt="gobuster-dir" />
	<WorkImage src="/images/posts/OpenSource/gobuster-console.png" alt="gobuster-console" />
	<WorkImage src="/images/posts/OpenSource/gobuster-shell.png" alt="gobuster-shell" />
	<P> A /shell and /console. First doesn&apos;t work, second is pin protected. Subdomain fuzzing with gobuster dns -d 10.10.11.164 -w /your/path/to/wordlist.txt  
	doesn&apos;t provide anything useful. But... there is a git file in the code we downloaded! git log --raw shows us that there could be a useful commit, which we will inspect with
	git diff ee9d9f1ef9156c787d53074493e39ae364cd1e05:Dockerfile HEAD:Dockerfile
	We can see that code line &quot;ENV FLASK_DEBUG=1&quot; was deleted. Changes made to a file without the debug mode won&apos;t be automatically updated in Flask. This could be useful later.
	We also notice a git branch dev which contains various commits, one of them including an user an a password: dev01:Soulless_Developer#2022
	</P>
	<WorkImage src="/images/posts/OpenSource/git-dockerfile.png" alt="git-dockerfile" />
	<P>Another interesting thing in the sourcecode is this:</P>
	<WorkImage src="/images/posts/OpenSource/filename-secure-version.png" alt="filename-secure-version" />
	<P>It seems that it will replace &quot;../&quot; with nothing in the file name we upload. Let&apos;s click on the "Take me there!" button. It really get us to 10.10.11.164/upclouds. Impressive. I&apos;m joking.
	We can now try to do something with burpsuite. We click on the upload button with intercept mode activated in burpsuite and change the filename with
	something like ..//..//..//..//etc/passwd but URL encoded, so we can try to download the passwd file. Forwarding this code it will provide us, indeed, with this file.
	 </P>
	<WorkImage src="/images/posts/OpenSource/prueba-burp-encode.png" alt="burpencode"/>
	<WorkImage src="/images/posts/OpenSource/prueba-burp-encode2.png" alt="burpencode2"/>

	
	<P>This means we can rewrite files too. We do the same process again but adding in the ..//app/app/views.py file the following lines to get a shell working:</P>
	<WorkImage src="/images/posts/OpenSource/code-views.png" alt="code-views"/>
	
	<P>If we now navigate to 10.10.11.164/bipbopbup aparently nothing happens. This is because we need to add ?cmd=whatever to our URL. The results won&apos;t show up in our navigator though. 
	So we now proceed to set a listener which I did with pwncat-cs, and execute a remote shell in the cmd we just set up (in the URL).
	And it works. Oh, don&apos;t forget to URL encode your reverse shell.
	</P>
	<WorkImage src="/images/posts/OpenSource/rce1.png" alt="rce1"/>
	<WorkImage src="/images/posts/OpenSource/rce2.png" alt="rce2"/>

	<P> We actually connected to something. A little research will show us that we are already root of this machine. But this is because we are in a Docker container! This container doesn&apos;t contain any flag at all :(</P>
	<WorkImage src="/images/posts/OpenSource/privesc1.png" alt="privesc1" />
	
	<P>The problem with a quick nmap is that it won&apos;t get you the ports you need everytime. With a complete one, you would have noticed that another port is shows up. Port 3000.
	Which is not useful in the beggining, but now is absolutely mandatory because in order to escape from this container we need to proxy to this port through the container.
	</P>
	<P>We will be using Chisel for it. With pwncat is easy to upload the necessary files to the container in the /tmp directory.</P>
	<Link href="https://0xdf.gitlab.io/2020/08/10/tunneling-with-chisel-and-ssf-update.html">https://0xdf.gitlab.io/2020/08/10/tunneling-with-chisel-and-ssf-update.html <ExternalLinkIcon mx="2px"/> </Link>
	<WorkImage src="/images/posts/OpenSource/chisel.png" alt="chisel"/>
	<P>We establish conection via chisel with local machine and open localhost:3000. To log in we will need the credentials we found earlier in the git dev branch.
	Now we can access the source code and we can find a RSA key: </P>
	<WorkImage src="/images/posts/OpenSource/login-rsa.png" alt="login-rsa"/>
	<P>If we now connect via ssh dev01@10.10.11.164 -i rsa-key we access the machine and we can get the user flag:</P>
	<WorkImage src="/images/posts/OpenSource/first-flag.png" alt="first-flag"/>
	<P> Now we need to privesc in order to get root flag. We upload pspy32 to the /tmp directory to monitor the processes in the machine. We soon encounter some of them executing with root permissions, git processes especifically.</P>
	<Link href="https://github.com/DominicBreuker/pspy">https://github.com/DominicBreuker/pspy <ExternalLinkIcon mx="2px"/> </Link>
	<WorkImage src="/images/posts/OpenSource/pspy-git-root.png" alt="pspy-git-root"/>
	<P>In the gtfobins webpage we find that we can rewrite something in the /.git/hooks/ folder to execute something. We will create a file here that contains the following code so we can have a bash with full permissions: chmod 7777 /bin/bash . With the command watch we can monitor when will root execute this file:</P>
	<Link href="https://gtfobins.github.io/gtfobins/git/">https://gtfobins.github.io/gtfobins/git/ <ExternalLinkIcon mx="2px"/> </Link>
	<WorkImage src="/images/posts/OpenSource/bash-chmod.png" alt="bash-chmod"/>
	<P> We now can execute bash in priviledge mode with bash -p and have full access to root.</P>
	<WorkImage src="/images/posts/OpenSource/get-root.png" alt="get-root"/>

	<P> Finally the root flag is ours!</P>

    </Container>
  </Layout>
)

export default Post
