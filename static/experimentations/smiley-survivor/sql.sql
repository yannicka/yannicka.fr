-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le : Sam 19 Novembre 2011 à 18:44
-- Version du serveur: 5.5.16
-- Version de PHP: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `smileys`
--

-- --------------------------------------------------------

--
-- Structure de la table `smiley`
--

CREATE TABLE IF NOT EXISTS `smiley` (
  `lien` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `smiley`
--

INSERT INTO `smiley` (`lien`) VALUES
('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAABLElEQVR4nO3YwQ3CMBREQfpviRZogRZoAQrAQR+DvY41T9pjnGRyy+UiSZIkSZL+33PCdBD8YPCDwQ8Gf0AlmOd9/KrPMtlnaPCDwQ8GPxj8SfWj3tZZ6z1iol8EPxj8YPCDwZ9UDXoBzB0/CPxg8IPBDwY/WDd+69rmef/H6r7HwfWx4AeDHwx+MPiT6obeBf9xfd/BmfDhw4cPH/4a+GccfPjw4cOHDx9+Hgj+poMPHz58+PDhw88Dwd90W+M377HQefDhw4cPH/4M/NoH+eHlqoDV7QTdCn4w+MHgB4MfbDh+avDhfwx+MPjB4C/W0h+khXpW6Fbwg8EPBj8Y/MUq/Q6owvyy6rNM9hka/GDwg8EPBv8EfYPTOx0EPxj8YPCDwZckSZIk6XS9AL3Z2OheDEu/AAAAAElFTkSuQmCC');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
