   M S B A M L   `   `   `  ����  EditeurPokelike-WPF    EditeurPokelike_WPF.Menu   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35^ ZWindowsFormsIntegration, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      -   5          N�Name$  page_editor��5       N� Title$
 Menu��5      $	��640��6   $	��480��6   .��5
      � -   5         �Name$ 	main_grid��5
       � ColumnDefinitions 5   
   �� 5       � RowDefinitions 5   
   �� 5      .+�5   
   �� -   5         ��Name$ txt_editor_creatures��5      $
��Bold"�62   $��18(�6D   $��0,213,0,243q�6R   $	��192��6g   $��24��6s    � ToolTip$S MEdition des créatures du jeu (informations générales, attaques et fusions)��6    �� TextAlignment$ Center=�6�   �� 6�   $��EditorCreature.xaml?�6�    �� TextDecorations$ 	Underline{�6  ���	#FFB61A1A.�6L  Éditeur de créatures6b  6n  �� 5   
   -   5        $ txt_editor_attacks��5      $
��Bold"�60   $��18(�6B   $��0,242,0,214q�6P   $	��192��6e   $��24��6q   $! Edition des attaques du jeu��6}   $ Center=�6�   �� 6�   $��EditorAttacks.xaml?�6�   $ 	Underline{�6�   ���	#FFB61A1A.�6  Éditeur d'attaques6.  6:  �� 5   
   -   5        $ txt_editor_maps��5      $
��Bold"�6-   $��18(�6?   $��224,300,224,156q�6M   $	��192��6f   $��24��6r   $ Edition des cartes du jeu��6~   $ Center=�6�   Éditeur de cartes6�   �� 5   
   -   5        $ txt_editor_types��5      $
��Bold"�6.   $��18(�6@   $��224,271,224,185q�6N   $	��192��6g   $��24��6s   $ Edition des types du jeu��6   $ Center=�6�   �� 6�   $��EditorTypes.xaml?�6�   $ 	Underline{�6�   ���	#FFB61A1A.�6  Éditeur de types6)  65  5      5      