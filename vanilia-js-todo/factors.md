1. Codebase
   - Für das Versionsmanagement wurde **GitHub** verwendet
   - Dadurch lebt nur eine einziges codebase und kann die Applikation mehrmals deployt werden
2. Dependencies
   - Für die explizite Deklarierung der Abhängigkeiten wurde npm verwendet
   - Für die Isolierung der installierten Abhängigkeiten verwendet npm das Ordner node_modules.
     Da werden die Abhängigkeiten unabhängig/separate von dem System installiert und damit ist es sichergestellt, dass keine
     Abhängigkeiten aus dem umgebenden System "hereinsickern".
   - Durch npm install wird ein nodes_module Ordner erzeugt und werden alle Abhängigkeiten, die in dem package.json File
     aufgelistet sind, installiert. Durch Löschen des Ordners werden auch den installierten Paketen einfach gelöscht.
3. Config
   - Um die Konfiguration für die verschiedene Deploys strikt von dem Codebase zu trennen, werden die Konfigurationen
     anhand Environments Variablen eingestellt. Diese Environment Variablen werden in dem config.js file verwaltet. Es
     werden hier unter anderem die Datenbank Credentials und der Port für das Hosten der webapplikation verwaltet. 
   - Da alle Credentials der Resourcen in den config.js file verwaltet werden, kann die Datenbank durch die geänderte
     Credentials sowohl mit lokalen als auch mit einer von Dritten zu Verfügung gestellten Datenbanken funktionieren
5. Build,release, run
   - Dieser Punkt habe ich nicht implementiert, aber ich würde das Build Phase mit einem GitHub Action erledigen, dass
     die Aktuelle Source Code im github repository auf einem Docker hub repository zu einem Docker image buildet. Die
     Realease und run könnte durch Azure ACI(Azure Container Instance) erfolgen, wobei für solche Services wie rollback
     bietet Docker Möglichkeiten an. (zum Beispiel: 'docker service rollback [OPTIONS] SERVICE')
8. Port binding
   - Die Bindung der Applikation an bestimmten Port erfolgt über die http-Modul von Node.js. Der Port selbst kann in
     dem config.js file eingestellt werden. Die Applikation kann danach über http Requests an diesen Port
     gesteuert/verwendet werden
11. Logs
    - alle Ereignisse werden mit hilfe von console.log () auf dem Konsol angezeigt. Das heißt die Applikation selbst kümmert
      sich nicht um log files. Mit Hilfe einer externen Software kann dann das Stream von Ereignissen zu
      ausgewertet/verwendet werden
12. Admin processes
    - Mit hilfe von npm können einmalige Vorgänge von der Konsole gestartet werden. Da ich es nicht genau weiß wie diese Punkt
      verstanden ist, habe ich hier nichts implementiert. Um selbst generierten Scripts anhand user Inputs auszuführen,
      könnte man durch das "require("repl")" Zeile mithilfe von repl-Modul eigene Befehle und Ereignisse definieren. quire("repl")" Zeile mithilfe von repl-Modul eigene Befehle und Ereignisse definieren. 