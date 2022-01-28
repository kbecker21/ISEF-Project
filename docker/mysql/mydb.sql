-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2022 at 10:39 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountlevel`
--

CREATE TABLE `accountlevel` (
  `idAccountLevel` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accountlevel`
--

INSERT INTO `accountlevel` (`idAccountLevel`, `Name`) VALUES
(3, 'User'),
(4, 'Tutor'),
(5, 'Admin');
-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `idAnswers` int(11) NOT NULL,
  `Question_idQuestion` int(11) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Truth` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `answers` (`idAnswers`, `Question_idQuestion`, `Description`, `Truth`) VALUES
(1, 1, 'Vorstand', 0),
(2, 1, 'CFO', 0),
(3, 1, 'Controller', 0),
(4, 1, 'treseur', 0),
(5, 2, 'Steuern', 0),
(6, 4, 'Auszahlung', 0),
(7, 4, 'Einzahlung', 0),
(9, 4, 'Steuern', 1);
-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL,
  `Subject_idSubject` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `CreateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `category` (`idcategory`, `Subject_idSubject`, `Name`, `Creator_idUser`, `CreateDate`) VALUES
(1, 1, 'Kapitel 1', 1, '2021-12-05 13:29:33'),
(2, 5, 'Kat1', 17, '2022-01-22 21:37:58'),
(3, 5, 'kat2', 17, '2022-01-22 21:37:58');
-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `idQuestion` int(11) NOT NULL,
  `category_idcategory` int(11) NOT NULL,
  `QuestionDescription` longtext DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `Approved` tinyint(4) DEFAULT NULL,
  `Approver_idUser` int(11) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `Flagged` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `question` (`idQuestion`, `category_idcategory`, `QuestionDescription`, `Creator_idUser`, `Approved`, `Approver_idUser`, `CreateDate`) VALUES
(1, 1, 'Rollen im finanzmanagement', 1, 1, 1, '2021-12-06 00:00:16'),
(2, 1, 'Aufgaben controller', 1, 1, 1, '2021-12-06 00:03:29'),
(4, 1, 'Aufgaben vom treasuer', 1, NULL, 1, '2021-12-07 15:06:09'),
(21, 2, 'Frage software 1', 17, 1, 17, '2022-01-22 21:38:46'),
(22, 2, 'Frage software 5', 17, 1, 17, '2022-01-22 21:39:22'),
(23, 2, 'Frage software 2', 17, 1, 17, '2022-01-22 21:40:28'),
(24, 2, 'Frage software 3', 17, 1, 17, '2022-01-22 21:40:49'),
(25, 2, 'Frage software 4', 17, 1, 17, '2022-01-22 21:41:03'),
(26, 2, 'Frage software 6', 17, 1, 17, '2022-01-22 21:41:54'),
(27, 2, 'Frage software 7', 17, 1, 17, '2022-01-22 21:42:06'),
(29, 2, 'Frage software 8', 17, 1, 17, '2022-01-22 21:42:45'),
(30, 2, 'Frage software 9', 17, 1, 17, '2022-01-22 21:42:57'),
(31, 2, 'Frage software 10', 17, 1, 17, '2022-01-22 21:43:12'),
(32, 2, 'Frage software 11', 17, 1, 17, '2022-01-22 21:43:28');
-- --------------------------------------------------------

--
-- Table structure for table `question_has_quiz`
--

CREATE TABLE `question_has_quiz` (
  `Question_idQuestion` int(11) NOT NULL,
  `Quiz_idQuiz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `idQuiz` int(11) NOT NULL,
  `PlayDate` datetime DEFAULT NULL,
  `Subject_idSubject` int(11) NOT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `Joiner_idUser1` int(11) DEFAULT NULL,
  `category_idcategory` int(11) NOT NULL,
  `Finish` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `User_idUser` int(11) NOT NULL,
  `Quiz_idQuiz` int(11) NOT NULL,
  `Points` int(11) DEFAULT NULL,
  `Winner` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `idSubject` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `ShortName` varchar(45) DEFAULT NULL,
  `Active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `subject` (`idSubject`, `Name`, `Creator_idUser`, `CreateDate`, `ShortName`, `Active`) VALUES
(1, 'Finanzbuchhaltung', 1, '2021-12-05 13:12:17', 'BFIN1', 0),
(3, 'Interne Buchhaltung', 1, '2021-12-05 13:17:19', 'BKLR', 1),
(5, 'Software', 10, '2021-12-09 05:32:01', 'esfs', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `FirstName` varchar(70) DEFAULT NULL,
  `LastName` varchar(70) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `AccountLevel_idAccountLevel` int(11) NOT NULL,
  `Lastupdated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `user` (`idUser`, `FirstName`, `LastName`, `Email`, `Password`, `CreateDate`, `Status`, `AccountLevel_idAccountLevel`, `Lastupdated`) VALUES
(1, 'TestNicolai', 'Schönenberger', 'Leon@leon.ch', '$2y$10$.nVZZuUOP4haihzONlONp.HbcF5..SQOM4a/F3TChehMV5y/AwB.K', '2021-12-05 18:20:14', 0, 5, '2021-12-23 11:36:48'),
(5, 'Dominik', 'Vogt', 'dominik.vogt@iubh-fernstudium.de', '124343123124123412', NULL, 0, 3, '2021-12-05 12:57:35'),
(10, 'Leon', 'Privat', 'leon.schoenenberger@gmx.ch', '$2y$10$bTSJ8uSCLEol2eOEic3YQudNpxCPAxMkOG3DaHaMMWHVXnFuvtCXO', '2021-12-08 01:34:04', 0, 5, NULL),
(15, 'Kevin1', 'test', 'Kevin@test.com', '$2y$10$C.oP9kXw82lQsVMGJbcRhO7hKBfFfRFGvUPbQEMVFtXu1.rZoBR8S', '2021-12-23 12:09:59', 0, 3, NULL),
(16, 'Nicolai', 'Rasch', 'Nicolai.Rasch@iubh-fernstudiuum.de', '$2y$10$ltoDNQXtPgFntq4Mvio.o.Wom9f.9AanZr.3BcZ3lSWrlTBVSHud2', '2021-12-23 12:26:59', 0, 5, NULL),
(17, 'dev', 'dev', 'dev@iubh-fernstudiuum.de', '$2y$10$NX3QO8ecDLZpDiBmpgDaFePquuoEXmiJ4zPQf3K0/VPnYbdorc39W', '2022-01-02 05:43:18', 0, 5, NULL);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountlevel`
--
ALTER TABLE `accountlevel`
  ADD PRIMARY KEY (`idAccountLevel`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`idAnswers`,`Question_idQuestion`),
  ADD KEY `fk_Answers_Question_idx` (`Question_idQuestion`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idcategory`,`Subject_idSubject`,`Creator_idUser`),
  ADD KEY `fk_category_Subject1_idx` (`Subject_idSubject`),
  ADD KEY `fk_category_User1_idx` (`Creator_idUser`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`idQuestion`,`category_idcategory`,`Creator_idUser`),
  ADD KEY `fk_Question_category1_idx` (`category_idcategory`),
  ADD KEY `fk_Question_User1_idx` (`Creator_idUser`),
  ADD KEY `fk_Question_User2_idx` (`Approver_idUser`);

--
-- Indexes for table `question_has_quiz`
--
ALTER TABLE `question_has_quiz`
  ADD PRIMARY KEY (`Question_idQuestion`,`Quiz_idQuiz`),
  ADD KEY `fk_Question_has_Quiz_Quiz1_idx` (`Quiz_idQuiz`),
  ADD KEY `fk_Question_has_Quiz_Question1_idx` (`Question_idQuestion`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`idQuiz`,`Subject_idSubject`,`Creator_idUser`),
  ADD KEY `fk_Quiz_Subject1_idx` (`Subject_idSubject`),
  ADD KEY `fk_Quiz_User1_idx` (`Creator_idUser`),
  ADD KEY `fk_Quiz_User2_idx` (`Joiner_idUser1`),
  ADD KEY `fk_Quiz_category1_idx` (`category_idcategory`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`User_idUser`,`Quiz_idQuiz`),
  ADD KEY `fk_User_has_Quiz_Quiz1_idx` (`Quiz_idQuiz`),
  ADD KEY `fk_User_has_Quiz_User1_idx` (`User_idUser`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`idSubject`,`Creator_idUser`),
  ADD KEY `fk_Subject_User1_idx` (`Creator_idUser`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`,`AccountLevel_idAccountLevel`),
  ADD KEY `fk_User_AccountLevel1_idx` (`AccountLevel_idAccountLevel`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountlevel`
--
ALTER TABLE `accountlevel`
  MODIFY `idAccountLevel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `idAnswers` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `idQuiz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `idSubject` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_Answers_Question` FOREIGN KEY (`Question_idQuestion`) REFERENCES `question` (`idQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `fk_category_Subject1` FOREIGN KEY (`Subject_idSubject`) REFERENCES `subject` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_category_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_Question_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_User2` FOREIGN KEY (`Approver_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_category1` FOREIGN KEY (`category_idcategory`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question_has_quiz`
--
ALTER TABLE `question_has_quiz`
  ADD CONSTRAINT `fk_Question_has_Quiz_Question1` FOREIGN KEY (`Question_idQuestion`) REFERENCES `question` (`idQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_has_Quiz_Quiz1` FOREIGN KEY (`Quiz_idQuiz`) REFERENCES `quiz` (`idQuiz`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `fk_Quiz_Subject1` FOREIGN KEY (`Subject_idSubject`) REFERENCES `subject` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quiz_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quiz_User2` FOREIGN KEY (`Joiner_idUser1`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quiz_category1` FOREIGN KEY (`category_idcategory`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_User_has_Quiz_Quiz1` FOREIGN KEY (`Quiz_idQuiz`) REFERENCES `quiz` (`idQuiz`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_has_Quiz_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `fk_Subject_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_User_AccountLevel1` FOREIGN KEY (`AccountLevel_idAccountLevel`) REFERENCES `accountlevel` (`idAccountLevel`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
