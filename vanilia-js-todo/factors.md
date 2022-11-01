1. Codebase
   - Für die Versionsmanagementsystem wurde **GitHub** verwendet
   - Dadurch lebt nur eine einziges codabase und kann mehrmals deployt werden
2. Dependencies
   - Für die explizite Deklarierung der Abhängigkeiten wurde npm verwendet
   - Für die Isolierung der installierte Abhängigkeiten verwendet npm das Ordner node_mosules
     da werden die Abhängigkeiten unabhängig von dem System installiert damit ist sichergestellt, dass keine Abhängigkeiten aus dem umgebenden System "hereinsickern".
   - Durch npm install wird ein nodes_module Ordner erzeugt und alle Abhängigkeiten, die in dem package.kson File aufgelistet sind installiert. Durch Löschen des Ordners werden auch die installierte Paketen einfach gelöscht.
3. Config
   - 