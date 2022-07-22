Links para o download da aplicação cliente:

LINUX: 
(1) Google Drive - https://drive.google.com/file/d/1lYuy4FZ8BV7InnmBNAJRGmZ_2znmGLPX/view?usp=sharing

(1) One Drive - https://1drv.ms/u/s!AjQVv0fF2WQo2BM0sV39MG4irkHw?e=zMdz0o

A pasta Interface contem os arquivos brutos de codificação, não sendo possível rodá-la a partir destes códigos.

Para instalar a aplicação:

(2) sudo dpkg -i infinity-deck-rmi.deb

Para iniciar o servidor

Pasta Server
(3) python3 server.py  - Iniciará no host 127.0.0.1 e porta 23123  // o mesmo que a aplicação

Para iniciar a aplicação

(4) cd /opt/infinity-deck
(5) infinity-deck --no-sandbox

Caso a aplicação tenha sido instalada em outro local, verifique usando:

(+) dpkg -L infinity-deck

3º linha da saída deve conter algo como:

/*/infinity-deck  →  /opt/infinity-deck




