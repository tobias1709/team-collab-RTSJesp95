-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 19. 08 2019 kl. 13:06:44
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cars_gruppeopgave`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_title` varchar(128) NOT NULL,
  `brand_image` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_title`, `brand_image`) VALUES
(1, 'Audi', 'audi-logo.png'),
(2, 'Mercedes-Benz', 'mercedes-logo.png'),
(3, 'Porsche', 'Porsche-logo.png'),
(4, 'BMW', 'bmw-logo.png'),
(5, 'Volkswagen', 'Volkswagen-Logo.png');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cars`
--

CREATE TABLE `cars` (
  `cars_id` int(11) NOT NULL,
  `cars_title` varchar(64) NOT NULL,
  `cars_description` varchar(1000) NOT NULL,
  `cars_topspeed` varchar(32) NOT NULL,
  `cars_price` decimal(12,3) NOT NULL,
  `cars_brand_fk` int(11) NOT NULL,
  `cars_image` varchar(128) NOT NULL,
  `cars_year` varchar(64) CHARACTER SET utf16 NOT NULL,
  `cars_weight_kg` varchar(64) CHARACTER SET utf16 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `cars`
--

INSERT INTO `cars` (`cars_id`, `cars_title`, `cars_description`, `cars_topspeed`, `cars_price`, `cars_brand_fk`, `cars_image`, `cars_year`, `cars_weight_kg`) VALUES
(1, 'R8', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '330', '1310000.000', 1, 'audi-r8.jpg', '2019', '1645'),
(2, 'TT RS', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '280', '403000.000', 1, 'audi-tt-rs.jpg', '2010', '1450'),
(3, 'M3 GTR', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '250', '1464000.000', 4, 'BMW-m3-gtr.jpg', '2001', '1350'),
(4, 'M5', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '328', '1478000.000', 4, 'bmw-m5.jpg', '2005', '1830'),
(5, 'E63 AMG', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '307', '1343000.000', 2, 'mercedes-benz-e63.jpg', '2013', '1865'),
(6, 'SLK55 AMG', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '250', '1041000.000', 2, 'mercedes-benz-slk55.jpg', '2012', '1600'),
(7, '911 GT3', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '304', '671000.000', 3, 'porsche-911-gt3.jpg', '2004', '1380'),
(8, '911 Turbo S', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '318', '1222000.000', 3, 'porsche-911-turbo.jpg', '2014', '1600'),
(9, 'Beetle RSi', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '225', '537000.000', 5, 'vw-beetle-rsijpg.jpg', '2000', '1515'),
(10, 'Golf R32', 'Lorem ipsum dolor sit amet, no pri assum labore, pro tollit tibique partiendo et. Cum no mentitum euripidis, et his salutandi erroribus. Vis laudem contentiones ad, duo cetero delicata complectitur no. Te sint natum has, vim laoreet veritus ut. Elit novum ubique te cum. Pro at wisi fugit assueverit, ei mea odio augue legere. Cum ne illud clita vocent, vis an tollit singulis necessitatibus.', '250', '500000.000', 5, 'vw-golf-r32.jpg', '2007', '1510');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indeks for tabel `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`cars_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tilføj AUTO_INCREMENT i tabel `cars`
--
ALTER TABLE `cars`
  MODIFY `cars_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
