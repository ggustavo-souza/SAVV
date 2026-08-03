
# SAVV
Um website voltado para a população de Votorantim, com o intuito de registrar e monitorar denúncias referentes ao meio ambiente da cidade.

## Arquitetura do sistema

A ideia do projeto é possuir uma arquitetura preparada para lidar com uma possível explosão de ocorrências, e mesmo assim conseguir armazenar os dados com integridade e de forma sólida. 

<img width="1045" height="465" alt="image" src="https://github.com/user-attachments/assets/b2637c0c-7914-4fb5-9de4-498f5038e737" />

Como ilustrado na imagem, a ideia é que após a comunicação cliente-servidor, os dados resultantes das ações sejam separados entre dois bancos. <br> <br>
O <b>PostGIS</b> será usado para armazenar os dados geográficos da aplicação, devido sua robustez e gama de funcionalidades quanto ao quesito georeferênciamento.<br><br>
Já o restante dos dados será armazenado em um banco <b>PostgreSQL</b>, devido sua robustez e capacidade de processamento.<br> <br>







