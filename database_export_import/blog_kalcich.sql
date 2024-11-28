-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Nov 28, 2024 alle 12:58
-- Versione del server: 10.11.6-MariaDB-0+deb12u1
-- Versione PHP: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_kalcich`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `tModificaPost`
--

CREATE TABLE `tModificaPost` (
  `idModifica` int(11) NOT NULL,
  `dataModificaPost` date DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tPost`
--

CREATE TABLE `tPost` (
  `idPost` int(11) NOT NULL,
  `titoloPost` varchar(255) DEFAULT NULL,
  `descrizionePost` text DEFAULT NULL,
  `dataCreazione` date DEFAULT NULL,
  `pathFotoPost` varchar(255) DEFAULT NULL,
  `dataEliminazionePost` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tUtente`
--

CREATE TABLE `tUtente` (
  `idUtente` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `passw` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `tModificaPost`
--
ALTER TABLE `tModificaPost`
  ADD PRIMARY KEY (`idModifica`),
  ADD KEY `idPost` (`idPost`);

--
-- Indici per le tabelle `tPost`
--
ALTER TABLE `tPost`
  ADD PRIMARY KEY (`idPost`);

--
-- Indici per le tabelle `tUtente`
--
ALTER TABLE `tUtente`
  ADD PRIMARY KEY (`idUtente`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `tModificaPost`
--
ALTER TABLE `tModificaPost`
  MODIFY `idModifica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tPost`
--
ALTER TABLE `tPost`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tUtente`
--
ALTER TABLE `tUtente`
  MODIFY `idUtente` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `tModificaPost`
--
ALTER TABLE `tModificaPost`
  ADD CONSTRAINT `tModificaPost_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `tPost` (`idPost`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
