-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2024 at 05:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `tModificaPost`
--

CREATE TABLE `tModificaPost` (
  `idModifica` int(11) NOT NULL,
  `dataModificaPost` date DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tModificaPost`
--

INSERT INTO `tModificaPost` (`idModifica`, `dataModificaPost`, `idPost`) VALUES
(3, '2024-12-06', 19),
(4, '2024-12-06', 21);

-- --------------------------------------------------------

--
-- Table structure for table `tPost`
--

CREATE TABLE `tPost` (
  `idPost` int(11) NOT NULL,
  `titoloPost` varchar(255) DEFAULT NULL,
  `descrizionePost` text DEFAULT NULL,
  `dataCreazione` date DEFAULT NULL,
  `pathFotoPost` varchar(255) DEFAULT NULL,
  `dataEliminazionePost` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tPost`
--

INSERT INTO `tPost` (`idPost`, `titoloPost`, `descrizionePost`, `dataCreazione`, `pathFotoPost`, `dataEliminazionePost`) VALUES
(19, 'Test', 'tyre', '2024-12-06', 'assets/images/chest.png', NULL),
(20, 'Si, è un test', 'sperimao funzioni sulla tabella tmodsifica', '2024-12-06', 'assets/images/dark_mode.png', NULL),
(21, 'Testissimo', 'dsjhvhi ds', '2024-12-06', 'assets/images/light_mode.png', NULL),
(22, 'djfsbxkjdc', 'escdkhvsdc', '2024-12-06', 'assets/images/chest.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tUtente`
--

CREATE TABLE `tUtente` (
  `idUtente` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `passw` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tUtente`
--

INSERT INTO `tUtente` (`idUtente`, `userName`, `passw`) VALUES
(1, 'matteo', '1234'),
(3, 'tempo', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tModificaPost`
--
ALTER TABLE `tModificaPost`
  ADD PRIMARY KEY (`idModifica`),
  ADD KEY `idPost` (`idPost`);

--
-- Indexes for table `tPost`
--
ALTER TABLE `tPost`
  ADD PRIMARY KEY (`idPost`);

--
-- Indexes for table `tUtente`
--
ALTER TABLE `tUtente`
  ADD PRIMARY KEY (`idUtente`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tModificaPost`
--
ALTER TABLE `tModificaPost`
  MODIFY `idModifica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tPost`
--
ALTER TABLE `tPost`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tUtente`
--
ALTER TABLE `tUtente`
  MODIFY `idUtente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tModificaPost`
--
ALTER TABLE `tModificaPost`
  ADD CONSTRAINT `tModificaPost_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `tPost` (`idPost`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
