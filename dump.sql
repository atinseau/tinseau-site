-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for osx10.17 (x86_64)
--
-- Host: localhost    Database: tinseau
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_permissions`
--

DROP TABLE IF EXISTS `admin_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions`)),
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_permissions_created_by_id_fk` (`created_by_id`),
  KEY `admin_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_permissions`
--

LOCK TABLES `admin_permissions` WRITE;
/*!40000 ALTER TABLE `admin_permissions` DISABLE KEYS */;
INSERT INTO `admin_permissions` VALUES
(1,'plugin::content-manager.explorer.create','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-04 12:14:19.291000','2022-09-10 16:05:53.160000',NULL,NULL),
(2,'plugin::content-manager.explorer.create','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-04 12:14:19.315000','2022-09-10 09:22:13.627000',NULL,NULL),
(3,'plugin::content-manager.explorer.create','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[]','2022-09-04 12:14:19.362000','2022-09-06 16:23:17.855000',NULL,NULL),
(4,'plugin::content-manager.explorer.read','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-04 12:14:19.372000','2022-09-10 16:05:53.160000',NULL,NULL),
(5,'plugin::content-manager.explorer.read','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-04 12:14:19.382000','2022-09-10 09:22:13.627000',NULL,NULL),
(6,'plugin::content-manager.explorer.read','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[]','2022-09-04 12:14:19.391000','2022-09-06 16:23:17.855000',NULL,NULL),
(7,'plugin::content-manager.explorer.update','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-04 12:14:19.398000','2022-09-10 16:05:53.160000',NULL,NULL),
(8,'plugin::content-manager.explorer.update','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-04 12:14:19.407000','2022-09-10 09:22:13.627000',NULL,NULL),
(9,'plugin::content-manager.explorer.update','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[]','2022-09-04 12:14:19.417000','2022-09-06 16:23:17.855000',NULL,NULL),
(10,'plugin::content-manager.explorer.delete','api::car.car','{}','[]','2022-09-04 12:14:19.427000','2022-09-04 12:14:19.427000',NULL,NULL),
(11,'plugin::content-manager.explorer.delete','api::circuit.circuit','{}','[]','2022-09-04 12:14:19.434000','2022-09-04 12:14:19.434000',NULL,NULL),
(12,'plugin::content-manager.explorer.delete','api::event.event','{}','[]','2022-09-04 12:14:19.444000','2022-09-04 12:14:19.444000',NULL,NULL),
(13,'plugin::content-manager.explorer.publish','api::car.car','{}','[]','2022-09-04 12:14:19.453000','2022-09-04 12:14:19.453000',NULL,NULL),
(14,'plugin::content-manager.explorer.publish','api::circuit.circuit','{}','[]','2022-09-04 12:14:19.463000','2022-09-04 12:14:19.463000',NULL,NULL),
(15,'plugin::content-manager.explorer.publish','api::event.event','{}','[]','2022-09-04 12:14:19.473000','2022-09-04 12:14:19.473000',NULL,NULL),
(16,'plugin::upload.read',NULL,'{}','[]','2022-09-04 12:14:19.483000','2022-09-04 12:14:19.483000',NULL,NULL),
(17,'plugin::upload.assets.create',NULL,'{}','[]','2022-09-04 12:14:19.490000','2022-09-04 12:14:19.490000',NULL,NULL),
(18,'plugin::upload.assets.update',NULL,'{}','[]','2022-09-04 12:14:19.500000','2022-09-04 12:14:19.500000',NULL,NULL),
(19,'plugin::upload.assets.download',NULL,'{}','[]','2022-09-04 12:14:19.509000','2022-09-04 12:14:19.509000',NULL,NULL),
(20,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-09-04 12:14:19.519000','2022-09-04 12:14:19.519000',NULL,NULL),
(21,'plugin::content-manager.explorer.create','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.529000','2022-09-10 16:05:53.160000',NULL,NULL),
(22,'plugin::content-manager.explorer.create','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.538000','2022-09-10 09:22:13.627000',NULL,NULL),
(23,'plugin::content-manager.explorer.create','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.546000','2022-09-06 16:23:17.855000',NULL,NULL),
(24,'plugin::content-manager.explorer.read','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.555000','2022-09-10 16:05:53.160000',NULL,NULL),
(25,'plugin::content-manager.explorer.read','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.565000','2022-09-10 09:22:13.627000',NULL,NULL),
(26,'plugin::content-manager.explorer.read','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.574000','2022-09-06 16:23:17.855000',NULL,NULL),
(27,'plugin::content-manager.explorer.update','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.583000','2022-09-10 16:05:53.160000',NULL,NULL),
(28,'plugin::content-manager.explorer.update','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.593000','2022-09-10 09:22:13.627000',NULL,NULL),
(29,'plugin::content-manager.explorer.update','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\"]}','[\"admin::is-creator\"]','2022-09-04 12:14:19.603000','2022-09-06 16:23:17.855000',NULL,NULL),
(30,'plugin::content-manager.explorer.delete','api::car.car','{}','[\"admin::is-creator\"]','2022-09-04 12:14:19.610000','2022-09-04 12:14:19.610000',NULL,NULL),
(31,'plugin::content-manager.explorer.delete','api::circuit.circuit','{}','[\"admin::is-creator\"]','2022-09-04 12:14:19.619000','2022-09-04 12:14:19.619000',NULL,NULL),
(32,'plugin::content-manager.explorer.delete','api::event.event','{}','[\"admin::is-creator\"]','2022-09-04 12:14:19.629000','2022-09-04 12:14:19.629000',NULL,NULL),
(33,'plugin::upload.read',NULL,'{}','[\"admin::is-creator\"]','2022-09-04 12:14:19.638000','2022-09-04 12:14:19.638000',NULL,NULL),
(34,'plugin::upload.assets.create',NULL,'{}','[]','2022-09-04 12:14:19.648000','2022-09-04 12:14:19.648000',NULL,NULL),
(35,'plugin::upload.assets.update',NULL,'{}','[\"admin::is-creator\"]','2022-09-04 12:14:19.658000','2022-09-04 12:14:19.658000',NULL,NULL),
(36,'plugin::upload.assets.download',NULL,'{}','[]','2022-09-04 12:14:19.668000','2022-09-04 12:14:19.668000',NULL,NULL),
(37,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-09-04 12:14:19.677000','2022-09-04 12:14:19.677000',NULL,NULL),
(38,'plugin::content-manager.explorer.create','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]}','[]','2022-09-04 12:14:19.700000','2022-09-04 12:14:19.700000',NULL,NULL),
(42,'plugin::content-manager.explorer.read','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]}','[]','2022-09-04 12:14:19.739000','2022-09-04 12:14:19.739000',NULL,NULL),
(46,'plugin::content-manager.explorer.update','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]}','[]','2022-09-04 12:14:19.776000','2022-09-04 12:14:19.776000',NULL,NULL),
(50,'plugin::content-manager.explorer.delete','plugin::users-permissions.user','{}','[]','2022-09-04 12:14:19.807000','2022-09-04 12:14:19.807000',NULL,NULL),
(51,'plugin::content-manager.explorer.delete','api::car.car','{}','[]','2022-09-04 12:14:19.814000','2022-09-04 12:14:19.814000',NULL,NULL),
(52,'plugin::content-manager.explorer.delete','api::circuit.circuit','{}','[]','2022-09-04 12:14:19.824000','2022-09-04 12:14:19.824000',NULL,NULL),
(53,'plugin::content-manager.explorer.delete','api::event.event','{}','[]','2022-09-04 12:14:19.833000','2022-09-04 12:14:19.833000',NULL,NULL),
(54,'plugin::content-manager.explorer.publish','api::car.car','{}','[]','2022-09-04 12:14:19.843000','2022-09-04 12:14:19.843000',NULL,NULL),
(55,'plugin::content-manager.explorer.publish','api::circuit.circuit','{}','[]','2022-09-04 12:14:19.852000','2022-09-04 12:14:19.852000',NULL,NULL),
(56,'plugin::content-manager.explorer.publish','api::event.event','{}','[]','2022-09-04 12:14:19.861000','2022-09-04 12:14:19.861000',NULL,NULL),
(57,'plugin::content-manager.single-types.configure-view',NULL,'{}','[]','2022-09-04 12:14:19.871000','2022-09-04 12:14:19.871000',NULL,NULL),
(58,'plugin::content-manager.collection-types.configure-view',NULL,'{}','[]','2022-09-04 12:14:19.881000','2022-09-04 12:14:19.881000',NULL,NULL),
(59,'plugin::content-manager.components.configure-layout',NULL,'{}','[]','2022-09-04 12:14:19.890000','2022-09-04 12:14:19.890000',NULL,NULL),
(60,'plugin::content-type-builder.read',NULL,'{}','[]','2022-09-04 12:14:19.900000','2022-09-04 12:14:19.900000',NULL,NULL),
(61,'plugin::email.settings.read',NULL,'{}','[]','2022-09-04 12:14:19.909000','2022-09-04 12:14:19.909000',NULL,NULL),
(62,'plugin::upload.read',NULL,'{}','[]','2022-09-04 12:14:19.918000','2022-09-04 12:14:19.918000',NULL,NULL),
(63,'plugin::upload.assets.create',NULL,'{}','[]','2022-09-04 12:14:19.927000','2022-09-04 12:14:19.927000',NULL,NULL),
(64,'plugin::upload.assets.update',NULL,'{}','[]','2022-09-04 12:14:19.937000','2022-09-04 12:14:19.937000',NULL,NULL),
(65,'plugin::upload.assets.download',NULL,'{}','[]','2022-09-04 12:14:19.946000','2022-09-04 12:14:19.946000',NULL,NULL),
(66,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-09-04 12:14:19.955000','2022-09-04 12:14:19.955000',NULL,NULL),
(67,'plugin::upload.settings.read',NULL,'{}','[]','2022-09-04 12:14:19.962000','2022-09-04 12:14:19.962000',NULL,NULL),
(68,'plugin::users-permissions.roles.create',NULL,'{}','[]','2022-09-04 12:14:19.971000','2022-09-04 12:14:19.971000',NULL,NULL),
(69,'plugin::users-permissions.roles.read',NULL,'{}','[]','2022-09-04 12:14:19.978000','2022-09-04 12:14:19.978000',NULL,NULL),
(70,'plugin::users-permissions.roles.update',NULL,'{}','[]','2022-09-04 12:14:19.988000','2022-09-04 12:14:19.988000',NULL,NULL),
(71,'plugin::users-permissions.roles.delete',NULL,'{}','[]','2022-09-04 12:14:19.996000','2022-09-04 12:14:19.996000',NULL,NULL),
(72,'plugin::users-permissions.providers.read',NULL,'{}','[]','2022-09-04 12:14:20.005000','2022-09-04 12:14:20.005000',NULL,NULL),
(73,'plugin::users-permissions.providers.update',NULL,'{}','[]','2022-09-04 12:14:20.015000','2022-09-04 12:14:20.015000',NULL,NULL),
(74,'plugin::users-permissions.email-templates.read',NULL,'{}','[]','2022-09-04 12:14:20.024000','2022-09-04 12:14:20.024000',NULL,NULL),
(75,'plugin::users-permissions.email-templates.update',NULL,'{}','[]','2022-09-04 12:14:20.034000','2022-09-04 12:14:20.034000',NULL,NULL),
(76,'plugin::users-permissions.advanced-settings.read',NULL,'{}','[]','2022-09-04 12:14:20.043000','2022-09-04 12:14:20.043000',NULL,NULL),
(77,'plugin::users-permissions.advanced-settings.update',NULL,'{}','[]','2022-09-04 12:14:20.051000','2022-09-04 12:14:20.051000',NULL,NULL),
(78,'plugin::i18n.locale.create',NULL,'{}','[]','2022-09-04 12:14:20.060000','2022-09-04 12:14:20.060000',NULL,NULL),
(79,'plugin::i18n.locale.read',NULL,'{}','[]','2022-09-04 12:14:20.076000','2022-09-04 12:14:20.076000',NULL,NULL),
(80,'plugin::i18n.locale.update',NULL,'{}','[]','2022-09-04 12:14:20.088000','2022-09-04 12:14:20.088000',NULL,NULL),
(81,'plugin::i18n.locale.delete',NULL,'{}','[]','2022-09-04 12:14:20.098000','2022-09-04 12:14:20.098000',NULL,NULL),
(82,'admin::marketplace.read',NULL,'{}','[]','2022-09-04 12:14:20.107000','2022-09-04 12:14:20.107000',NULL,NULL),
(83,'admin::marketplace.plugins.install',NULL,'{}','[]','2022-09-04 12:14:20.123000','2022-09-04 12:14:20.123000',NULL,NULL),
(84,'admin::marketplace.plugins.uninstall',NULL,'{}','[]','2022-09-04 12:14:20.130000','2022-09-04 12:14:20.130000',NULL,NULL),
(85,'admin::webhooks.create',NULL,'{}','[]','2022-09-04 12:14:20.139000','2022-09-04 12:14:20.139000',NULL,NULL),
(86,'admin::webhooks.read',NULL,'{}','[]','2022-09-04 12:14:20.147000','2022-09-04 12:14:20.147000',NULL,NULL),
(87,'admin::webhooks.update',NULL,'{}','[]','2022-09-04 12:14:20.155000','2022-09-04 12:14:20.155000',NULL,NULL),
(88,'admin::webhooks.delete',NULL,'{}','[]','2022-09-04 12:14:20.164000','2022-09-04 12:14:20.164000',NULL,NULL),
(89,'admin::users.create',NULL,'{}','[]','2022-09-04 12:14:20.174000','2022-09-04 12:14:20.174000',NULL,NULL),
(90,'admin::users.read',NULL,'{}','[]','2022-09-04 12:14:20.184000','2022-09-04 12:14:20.184000',NULL,NULL),
(91,'admin::users.update',NULL,'{}','[]','2022-09-04 12:14:20.193000','2022-09-04 12:14:20.193000',NULL,NULL),
(92,'admin::users.delete',NULL,'{}','[]','2022-09-04 12:14:20.202000','2022-09-04 12:14:20.202000',NULL,NULL),
(93,'admin::roles.create',NULL,'{}','[]','2022-09-04 12:14:20.212000','2022-09-04 12:14:20.212000',NULL,NULL),
(94,'admin::roles.read',NULL,'{}','[]','2022-09-04 12:14:20.220000','2022-09-04 12:14:20.220000',NULL,NULL),
(95,'admin::roles.update',NULL,'{}','[]','2022-09-04 12:14:20.233000','2022-09-04 12:14:20.233000',NULL,NULL),
(96,'admin::roles.delete',NULL,'{}','[]','2022-09-04 12:14:20.242000','2022-09-04 12:14:20.242000',NULL,NULL),
(97,'admin::api-tokens.create',NULL,'{}','[]','2022-09-04 12:14:20.250000','2022-09-04 12:14:20.250000',NULL,NULL),
(98,'admin::api-tokens.read',NULL,'{}','[]','2022-09-04 12:14:20.260000','2022-09-04 12:14:20.260000',NULL,NULL),
(99,'admin::api-tokens.update',NULL,'{}','[]','2022-09-04 12:14:20.271000','2022-09-04 12:14:20.271000',NULL,NULL),
(100,'admin::api-tokens.delete',NULL,'{}','[]','2022-09-04 12:14:20.281000','2022-09-04 12:14:20.281000',NULL,NULL),
(101,'admin::project-settings.update',NULL,'{}','[]','2022-09-04 12:14:20.291000','2022-09-04 12:14:20.291000',NULL,NULL),
(102,'admin::project-settings.read',NULL,'{}','[]','2022-09-04 12:14:20.301000','2022-09-04 12:14:20.301000',NULL,NULL),
(129,'plugin::content-manager.explorer.create','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"classic.price\",\"classic.options.name\",\"classic.options.price\",\"classic.options.settings\"]}','[]','2022-09-06 16:23:17.800000','2022-09-06 16:23:17.800000',NULL,NULL),
(130,'plugin::content-manager.explorer.read','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"classic.price\",\"classic.options.name\",\"classic.options.price\",\"classic.options.settings\"]}','[]','2022-09-06 16:23:17.810000','2022-09-06 16:23:17.810000',NULL,NULL),
(131,'plugin::content-manager.explorer.update','api::event.event','{\"fields\":[\"title\",\"date\",\"description\",\"circuit\",\"locations.exclusive_price\",\"locations.car\",\"locations.name\",\"locations.options.name\",\"locations.options.price\",\"locations.options.settings\",\"locations.serie_format\",\"locations.available_series\",\"locations.serie_price\",\"places\",\"global_options.name\",\"global_options.price\",\"global_options.settings\",\"classic.price\",\"classic.options.name\",\"classic.options.price\",\"classic.options.settings\"]}','[]','2022-09-06 16:23:17.819000','2022-09-06 16:23:17.819000',NULL,NULL),
(132,'plugin::content-manager.explorer.create','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-10 09:22:13.585000','2022-09-10 09:22:13.585000',NULL,NULL),
(133,'plugin::content-manager.explorer.read','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-10 09:22:13.587000','2022-09-10 09:22:13.587000',NULL,NULL),
(134,'plugin::content-manager.explorer.update','api::circuit.circuit','{\"fields\":[\"title\",\"description\",\"events\",\"logo\"]}','[]','2022-09-10 09:22:13.589000','2022-09-10 09:22:13.589000',NULL,NULL),
(138,'plugin::content-manager.explorer.create','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-10 16:05:34.461000','2022-09-10 16:05:34.461000',NULL,NULL),
(139,'plugin::content-manager.explorer.read','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-10 16:05:34.464000','2022-09-10 16:05:34.464000',NULL,NULL),
(140,'plugin::content-manager.explorer.update','api::car.car','{\"fields\":[\"name\",\"images\",\"description\"]}','[]','2022-09-10 16:05:34.466000','2022-09-10 16:05:34.466000',NULL,NULL);
/*!40000 ALTER TABLE `admin_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_permissions_role_links`
--

DROP TABLE IF EXISTS `admin_permissions_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_permissions_role_links` (
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `admin_permissions_role_links_fk` (`permission_id`),
  KEY `admin_permissions_role_links_inv_fk` (`role_id`),
  CONSTRAINT `admin_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_permissions_role_links`
--

LOCK TABLES `admin_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `admin_permissions_role_links` DISABLE KEYS */;
INSERT INTO `admin_permissions_role_links` VALUES
(1,2,1),
(2,2,2),
(3,2,3),
(4,2,4),
(5,2,5),
(6,2,6),
(7,2,7),
(8,2,8),
(9,2,9),
(10,2,10),
(11,2,11),
(12,2,12),
(13,2,13),
(14,2,14),
(15,2,15),
(16,2,16),
(17,2,17),
(18,2,18),
(19,2,19),
(20,2,20),
(21,3,21),
(22,3,22),
(23,3,23),
(24,3,24),
(25,3,25),
(26,3,26),
(27,3,27),
(28,3,28),
(29,3,29),
(30,3,30),
(31,3,31),
(32,3,32),
(33,3,33),
(34,3,34),
(35,3,35),
(36,3,36),
(37,3,37),
(38,1,38),
(42,1,41),
(46,1,44),
(50,1,47),
(51,1,48),
(52,1,49),
(53,1,50),
(54,1,51),
(55,1,52),
(56,1,53),
(57,1,54),
(58,1,55),
(59,1,56),
(60,1,57),
(61,1,58),
(62,1,59),
(63,1,60),
(64,1,61),
(65,1,62),
(66,1,63),
(67,1,64),
(68,1,65),
(69,1,66),
(70,1,67),
(71,1,68),
(72,1,69),
(73,1,70),
(74,1,71),
(75,1,72),
(76,1,73),
(77,1,74),
(78,1,75),
(79,1,76),
(80,1,77),
(81,1,78),
(82,1,79),
(83,1,80),
(84,1,81),
(85,1,82),
(86,1,83),
(87,1,84),
(88,1,85),
(89,1,86),
(90,1,87),
(91,1,88),
(92,1,89),
(93,1,90),
(94,1,91),
(95,1,92),
(96,1,93),
(97,1,94),
(98,1,95),
(99,1,96),
(100,1,97),
(101,1,98),
(102,1,99),
(129,1,117),
(130,1,118),
(131,1,119),
(132,1,120),
(133,1,121),
(134,1,122),
(138,1,126),
(139,1,127),
(140,1,128);
/*!40000 ALTER TABLE `admin_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_roles`
--

DROP TABLE IF EXISTS `admin_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_roles_created_by_id_fk` (`created_by_id`),
  KEY `admin_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_roles`
--

LOCK TABLES `admin_roles` WRITE;
/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */;
INSERT INTO `admin_roles` VALUES
(1,'Super Admin','strapi-super-admin','Super Admins can access and manage all features and settings.','2022-09-04 12:14:19.225000','2022-09-04 12:14:19.225000',NULL,NULL),
(2,'Editor','strapi-editor','Editors can manage and publish contents including those of other users.','2022-09-04 12:14:19.239000','2022-09-04 12:14:19.239000',NULL,NULL),
(3,'Author','strapi-author','Authors can manage the content they have created.','2022-09-04 12:14:19.275000','2022-09-04 12:14:19.275000',NULL,NULL);
/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `registration_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `prefered_language` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_users_created_by_id_fk` (`created_by_id`),
  KEY `admin_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES
(1,'Arthur','Tinseau',NULL,'arthurtweak@gmail.com','$2a$10$G9mDCH0Ua8rJxErK4fQknex97gZX/.Zvbg095CcfycTVQZurIAeba',NULL,NULL,1,0,NULL,'2022-09-04 12:14:46.738000','2022-09-04 12:14:46.738000',NULL,NULL);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users_roles_links`
--

DROP TABLE IF EXISTS `admin_users_roles_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users_roles_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `admin_users_roles_links_fk` (`user_id`),
  KEY `admin_users_roles_links_inv_fk` (`role_id`),
  CONSTRAINT `admin_users_roles_links_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_users_roles_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users_roles_links`
--

LOCK TABLES `admin_users_roles_links` WRITE;
/*!40000 ALTER TABLE `admin_users_roles_links` DISABLE KEYS */;
INSERT INTO `admin_users_roles_links` VALUES
(1,1,1);
/*!40000 ALTER TABLE `admin_users_roles_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cars_created_by_id_fk` (`created_by_id`),
  KEY `cars_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `cars_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cars_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES
(1,'M3 e82i','2022-09-04 12:55:48.924000','2022-09-10 16:06:08.151000','2022-09-05 12:01:01.012000',1,1,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fuga dicta beatae dolorem quas explicabo sequi. A perferendis minus consequuntur et quaerat, hic id odio quia aliquam alias libero atque!'),
(2,'Porsche 911 gt3 rs','2022-09-05 23:45:45.344000','2022-09-10 16:06:12.471000','2022-09-05 23:52:01.879000',1,1,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fuga dicta beatae dolorem quas explicabo sequi. A perferendis minus consequuntur et quaerat, hic id odio quia aliquam alias libero atque!');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `circuits`
--

DROP TABLE IF EXISTS `circuits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `circuits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `circuits_created_by_id_fk` (`created_by_id`),
  KEY `circuits_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `circuits_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `circuits_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circuits`
--

LOCK TABLES `circuits` WRITE;
/*!40000 ALTER TABLE `circuits` DISABLE KEYS */;
INSERT INTO `circuits` VALUES
(1,'Circuit le mans buggati','Le circuit Bugatti est un circuit permanent de sports mécaniques situé au sud de la ville du Mans en France. Bien qu\'il accueille des courses de voitures et de camions, il est surtout connu pour ses épreuves motocyclistes.','2022-09-04 12:54:46.883000','2022-09-10 09:22:54.417000','2022-09-05 12:00:56.030000',1,1);
/*!40000 ALTER TABLE `circuits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_acces_pistes`
--

DROP TABLE IF EXISTS `components_ttd_acces_pistes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_acces_pistes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_acces_pistes`
--

LOCK TABLES `components_ttd_acces_pistes` WRITE;
/*!40000 ALTER TABLE `components_ttd_acces_pistes` DISABLE KEYS */;
INSERT INTO `components_ttd_acces_pistes` VALUES
(1,500.00),
(2,550.00),
(3,650.00),
(4,550.00),
(5,650.00);
/*!40000 ALTER TABLE `components_ttd_acces_pistes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_acces_pistes_components`
--

DROP TABLE IF EXISTS `components_ttd_acces_pistes_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_acces_pistes_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `components_ttd_acces_pistes_field_index` (`field`),
  KEY `components_ttd_acces_pistes_component_type_index` (`component_type`),
  KEY `components_ttd_acces_pistes_entity_fk` (`entity_id`),
  CONSTRAINT `components_ttd_acces_pistes_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_ttd_acces_pistes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_acces_pistes_components`
--

LOCK TABLES `components_ttd_acces_pistes_components` WRITE;
/*!40000 ALTER TABLE `components_ttd_acces_pistes_components` DISABLE KEYS */;
INSERT INTO `components_ttd_acces_pistes_components` VALUES
(25,1,8,'ttd.options','options',1),
(26,2,10,'ttd.options','options',1),
(28,3,15,'ttd.options','options',1),
(33,4,19,'ttd.options','options',1),
(34,5,23,'ttd.options','options',1);
/*!40000 ALTER TABLE `components_ttd_acces_pistes_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_locations`
--

DROP TABLE IF EXISTS `components_ttd_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_locations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `exclusive_price` decimal(10,2) DEFAULT NULL,
  `serie_format` varchar(255) DEFAULT NULL,
  `available_series` int(11) DEFAULT NULL,
  `serie_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_locations`
--

LOCK TABLES `components_ttd_locations` WRITE;
/*!40000 ALTER TABLE `components_ttd_locations` DISABLE KEYS */;
INSERT INTO `components_ttd_locations` VALUES
(1,'M3 e82i',NULL,NULL,NULL,NULL),
(2,'M3 e82i',NULL,NULL,NULL,NULL),
(3,'Ma porsche',5500.00,'s4,t6',4,1200.00),
(4,'Ma porsche',5500.00,'s3,t4',4,550.00),
(5,'M3',3500.00,'s3,t4',3,500.00);
/*!40000 ALTER TABLE `components_ttd_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_locations_car_links`
--

DROP TABLE IF EXISTS `components_ttd_locations_car_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_locations_car_links` (
  `locations_id` int(10) unsigned DEFAULT NULL,
  `car_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `components_ttd_locations_car_links_fk` (`locations_id`),
  KEY `components_ttd_locations_car_links_inv_fk` (`car_id`),
  CONSTRAINT `components_ttd_locations_car_links_fk` FOREIGN KEY (`locations_id`) REFERENCES `components_ttd_locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_ttd_locations_car_links_inv_fk` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_locations_car_links`
--

LOCK TABLES `components_ttd_locations_car_links` WRITE;
/*!40000 ALTER TABLE `components_ttd_locations_car_links` DISABLE KEYS */;
INSERT INTO `components_ttd_locations_car_links` VALUES
(1,1,30),
(2,1,32),
(5,1,38),
(3,2,39),
(4,2,40);
/*!40000 ALTER TABLE `components_ttd_locations_car_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_locations_components`
--

DROP TABLE IF EXISTS `components_ttd_locations_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_locations_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `components_ttd_locations_field_index` (`field`),
  KEY `components_ttd_locations_component_type_index` (`component_type`),
  KEY `components_ttd_locations_entity_fk` (`entity_id`),
  CONSTRAINT `components_ttd_locations_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_ttd_locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_locations_components`
--

LOCK TABLES `components_ttd_locations_components` WRITE;
/*!40000 ALTER TABLE `components_ttd_locations_components` DISABLE KEYS */;
/*!40000 ALTER TABLE `components_ttd_locations_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components_ttd_options`
--

DROP TABLE IF EXISTS `components_ttd_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components_ttd_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components_ttd_options`
--

LOCK TABLES `components_ttd_options` WRITE;
/*!40000 ALTER TABLE `components_ttd_options` DISABLE KEYS */;
INSERT INTO `components_ttd_options` VALUES
(2,'Salut tout le monde',5000.00,'{\"type\":\"number\",\"value\":200}'),
(5,'Accompagnateur',100.00,'{\"type\":\"number\",\"value\":0}'),
(6,'Repas',47.00,'{\"type\":\"number\",\"value\":1}'),
(7,'Pilote supplémentaire',0.00,'{\"type\":\"number\",\"value\":0}'),
(8,'Coach',200.00,'{\"type\":\"bool\",\"value\":false}'),
(9,'Bapteme de piste',100.00,'{\"type\":\"bool\",\"value\":false}'),
(10,'Coach',100.00,'{\"type\":\"bool\",\"value\":false}'),
(11,'Accompagnateur',100.00,'{\"type\":\"number\",\"value\":0}'),
(12,'Repas',47.00,'{\"type\":\"number\",\"value\":1}'),
(13,'Bapteme de piste',100.00,'{\"type\":\"bool\",\"value\":false}'),
(14,'Pilote supplémentaire',0.00,'{\"type\":\"number\",\"value\":0}'),
(15,'Coach',100.00,'{\"type\":\"bool\",\"value\":false}'),
(16,'Repas',47.00,'{\"type\":\"number\",\"value\":1}'),
(17,'Accompagnateur',100.00,'{\"type\":\"number\",\"value\":0}'),
(18,'Pilote supplémentaire',150.00,'{\"type\":\"number\",\"value\":0}'),
(19,'Coach dédié',200.00,'{\"type\":\"number\",\"value\":0}'),
(20,'Repas',47.00,'{\"type\":\"number\",\"value\":1}'),
(21,'Accompagnateur',100.00,'{\"type\":\"number\",\"value\":0}'),
(22,'Pilote supplémentaire',150.00,'{\"type\":\"number\",\"value\":0}'),
(23,'Coach dédié',200.00,'{\"type\":\"number\",\"value\":0}');
/*!40000 ALTER TABLE `components_ttd_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `places` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `events_created_by_id_fk` (`created_by_id`),
  KEY `events_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `events_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `events_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES
(3,'Journée du 18 mars','2022-09-18 02:50:00.000000','##### qsdqsdqsdqsdqsd\nqs\ndq\nsd\n\nqsd',85,'2022-09-05 23:49:16.344000','2022-09-06 16:24:15.127000','2022-09-05 23:51:55.953000',1,1),
(4,'Journée du 25 septembre','2022-09-25 02:50:00.000000','##### qsdqsdqsdqsdqsd\nqs\ndq\nsd\n\nqsd',65,'2022-09-05 23:52:49.161000','2022-09-10 09:53:19.864000','2022-09-05 23:52:50.451000',1,1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_circuit_links`
--

DROP TABLE IF EXISTS `events_circuit_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_circuit_links` (
  `event_id` int(10) unsigned DEFAULT NULL,
  `circuit_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `events_circuit_links_fk` (`event_id`),
  KEY `events_circuit_links_inv_fk` (`circuit_id`),
  CONSTRAINT `events_circuit_links_fk` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_circuit_links_inv_fk` FOREIGN KEY (`circuit_id`) REFERENCES `circuits` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_circuit_links`
--

LOCK TABLES `events_circuit_links` WRITE;
/*!40000 ALTER TABLE `events_circuit_links` DISABLE KEYS */;
INSERT INTO `events_circuit_links` VALUES
(3,1,36),
(4,1,38);
/*!40000 ALTER TABLE `events_circuit_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_components`
--

DROP TABLE IF EXISTS `events_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `events_field_index` (`field`),
  KEY `events_component_type_index` (`component_type`),
  KEY `events_entity_fk` (`entity_id`),
  CONSTRAINT `events_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_components`
--

LOCK TABLES `events_components` WRITE;
/*!40000 ALTER TABLE `events_components` DISABLE KEYS */;
INSERT INTO `events_components` VALUES
(131,3,3,'ttd.locations','locations',1),
(132,3,5,'ttd.locations','locations',2),
(133,3,16,'ttd.options','global_options',1),
(134,3,17,'ttd.options','global_options',2),
(135,3,18,'ttd.options','global_options',3),
(136,3,4,'ttd.acces-piste','classic',1),
(137,4,4,'ttd.locations','locations',1),
(138,4,20,'ttd.options','global_options',1),
(139,4,21,'ttd.options','global_options',2),
(140,4,22,'ttd.options','global_options',3),
(141,4,5,'ttd.acces-piste','classic',1);
/*!40000 ALTER TABLE `events_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `alternative_text` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `formats` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`formats`)),
  `hash` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL,
  `size` decimal(10,2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `preview_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`provider_metadata`)),
  `folder_path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `upload_files_folder_path_index` (`folder_path`),
  KEY `files_created_by_id_fk` (`created_by_id`),
  KEY `files_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES
(1,'lemans.png','lemans.png','lemans.png',555,217,'{\"thumbnail\":{\"name\":\"thumbnail_lemans.png\",\"hash\":\"thumbnail_lemans_9ef663a85b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":96,\"size\":36.85,\"url\":\"/uploads/thumbnail_lemans_9ef663a85b.png\"},\"small\":{\"name\":\"small_lemans.png\",\"hash\":\"small_lemans_9ef663a85b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":195,\"size\":108.75,\"url\":\"/uploads/small_lemans_9ef663a85b.png\"}}','lemans_9ef663a85b','.png','image/png',24.88,'/uploads/lemans_9ef663a85b.png',NULL,'local',NULL,'/','2022-09-10 09:22:47.894000','2022-09-10 09:22:47.894000',1,1),
(2,'bmw1.jpg','blablabla','sdsqqsd',1944,1094,'{\"thumbnail\":{\"name\":\"thumbnail_bmw1.jpg\",\"hash\":\"thumbnail_bmw1_4c63a63f26\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":245,\"height\":138,\"size\":10.67,\"url\":\"/uploads/thumbnail_bmw1_4c63a63f26.jpg\"},\"small\":{\"name\":\"small_bmw1.jpg\",\"hash\":\"small_bmw1_4c63a63f26\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":500,\"height\":281,\"size\":34.28,\"url\":\"/uploads/small_bmw1_4c63a63f26.jpg\"},\"medium\":{\"name\":\"medium_bmw1.jpg\",\"hash\":\"medium_bmw1_4c63a63f26\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":750,\"height\":422,\"size\":66.63,\"url\":\"/uploads/medium_bmw1_4c63a63f26.jpg\"},\"large\":{\"name\":\"large_bmw1.jpg\",\"hash\":\"large_bmw1_4c63a63f26\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":1000,\"height\":563,\"size\":105.57,\"url\":\"/uploads/large_bmw1_4c63a63f26.jpg\"}}','bmw1_4c63a63f26','.jpg','image/jpeg',333.49,'/uploads/bmw1_4c63a63f26.jpg',NULL,'local',NULL,'/1/2','2022-09-10 09:39:43.835000','2022-09-10 09:39:43.835000',1,1),
(3,'clubsport.jpeg','clubsport.jpeg','clubsport.jpeg',1935,1089,'{\"thumbnail\":{\"name\":\"thumbnail_clubsport.jpeg\",\"hash\":\"thumbnail_clubsport_cfc1d18f8f\",\"ext\":\".jpeg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":245,\"height\":138,\"size\":8.37,\"url\":\"/uploads/thumbnail_clubsport_cfc1d18f8f.jpeg\"},\"medium\":{\"name\":\"medium_clubsport.jpeg\",\"hash\":\"medium_clubsport_cfc1d18f8f\",\"ext\":\".jpeg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":750,\"height\":422,\"size\":52.15,\"url\":\"/uploads/medium_clubsport_cfc1d18f8f.jpeg\"},\"small\":{\"name\":\"small_clubsport.jpeg\",\"hash\":\"small_clubsport_cfc1d18f8f\",\"ext\":\".jpeg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":500,\"height\":281,\"size\":26.71,\"url\":\"/uploads/small_clubsport_cfc1d18f8f.jpeg\"},\"large\":{\"name\":\"large_clubsport.jpeg\",\"hash\":\"large_clubsport_cfc1d18f8f\",\"ext\":\".jpeg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":1000,\"height\":563,\"size\":83.02,\"url\":\"/uploads/large_clubsport_cfc1d18f8f.jpeg\"}}','clubsport_cfc1d18f8f','.jpeg','image/jpeg',222.63,'/uploads/clubsport_cfc1d18f8f.jpeg',NULL,'local',NULL,'/1/3','2022-09-10 10:15:58.503000','2022-09-10 10:15:58.503000',1,1);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files_folder_links`
--

DROP TABLE IF EXISTS `files_folder_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files_folder_links` (
  `file_id` int(10) unsigned DEFAULT NULL,
  `folder_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `files_folder_links_fk` (`file_id`),
  KEY `files_folder_links_inv_fk` (`folder_id`),
  CONSTRAINT `files_folder_links_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `files_folder_links_inv_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files_folder_links`
--

LOCK TABLES `files_folder_links` WRITE;
/*!40000 ALTER TABLE `files_folder_links` DISABLE KEYS */;
INSERT INTO `files_folder_links` VALUES
(2,2,1),
(3,3,2);
/*!40000 ALTER TABLE `files_folder_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files_related_morphs`
--

DROP TABLE IF EXISTS `files_related_morphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files_related_morphs` (
  `file_id` int(10) unsigned DEFAULT NULL,
  `related_id` int(10) unsigned DEFAULT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `files_related_morphs_fk` (`file_id`),
  CONSTRAINT `files_related_morphs_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files_related_morphs`
--

LOCK TABLES `files_related_morphs` WRITE;
/*!40000 ALTER TABLE `files_related_morphs` DISABLE KEYS */;
INSERT INTO `files_related_morphs` VALUES
(1,1,'api::circuit.circuit','logo',1,1),
(2,1,'api::car.car','images',1,5),
(3,2,'api::car.car','images',1,6);
/*!40000 ALTER TABLE `files_related_morphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `i18n_locale`
--

DROP TABLE IF EXISTS `i18n_locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i18n_locale` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i18n_locale_created_by_id_fk` (`created_by_id`),
  KEY `i18n_locale_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i18n_locale`
--

LOCK TABLES `i18n_locale` WRITE;
/*!40000 ALTER TABLE `i18n_locale` DISABLE KEYS */;
INSERT INTO `i18n_locale` VALUES
(1,'English (en)','en','2022-09-04 12:14:19.178000','2022-09-04 12:14:19.178000',NULL,NULL);
/*!40000 ALTER TABLE `i18n_locale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_api_tokens`
--

DROP TABLE IF EXISTS `strapi_api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_tokens_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_tokens_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_api_tokens`
--

LOCK TABLES `strapi_api_tokens` WRITE;
/*!40000 ALTER TABLE `strapi_api_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_core_store_settings`
--

DROP TABLE IF EXISTS `strapi_core_store_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_core_store_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_core_store_settings`
--

LOCK TABLES `strapi_core_store_settings` WRITE;
/*!40000 ALTER TABLE `strapi_core_store_settings` DISABLE KEYS */;
INSERT INTO `strapi_core_store_settings` VALUES
(1,'strapi_content_types_schema','{\"admin::permission\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"admin::permission\",\"plugin\":\"admin\",\"globalId\":\"AdminPermission\"},\"admin::user\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"admin::user\",\"plugin\":\"admin\",\"globalId\":\"AdminUser\"},\"admin::role\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"admin::role\",\"plugin\":\"admin\",\"globalId\":\"AdminRole\"},\"admin::api-token\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\"],\"configurable\":false,\"required\":false,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\"],\"configurable\":false,\"required\":false,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token\",\"connection\":\"default\",\"uid\":\"admin::api-token\",\"plugin\":\"admin\",\"globalId\":\"AdminApiToken\"},\"plugin::upload.file\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"file\",\"connection\":\"default\",\"uid\":\"plugin::upload.file\",\"plugin\":\"upload\",\"globalId\":\"UploadFile\"},\"plugin::upload.folder\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"folder\",\"connection\":\"default\",\"uid\":\"plugin::upload.folder\",\"plugin\":\"upload\",\"globalId\":\"UploadFolder\"},\"plugin::i18n.locale\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"locale\",\"connection\":\"default\",\"uid\":\"plugin::i18n.locale\",\"plugin\":\"i18n\",\"collectionName\":\"i18n_locale\",\"globalId\":\"I18NLocale\"},\"plugin::users-permissions.permission\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.permission\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsPermission\"},\"plugin::users-permissions.role\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.role\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsRole\"},\"plugin::users-permissions.user\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":true},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"confirmationToken\":{\"hidden\":true},\"provider\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":true},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.user\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsUser\"},\"api::car.car\":{\"kind\":\"collectionType\",\"collectionName\":\"cars\",\"info\":{\"singularName\":\"car\",\"pluralName\":\"cars\",\"displayName\":\"Voiture\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"images\":{\"type\":\"media\",\"multiple\":true,\"required\":true,\"allowedTypes\":[\"images\"]},\"description\":{\"type\":\"text\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"cars\",\"info\":{\"singularName\":\"car\",\"pluralName\":\"cars\",\"displayName\":\"Voiture\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"images\":{\"type\":\"media\",\"multiple\":true,\"required\":true,\"allowedTypes\":[\"images\"]},\"description\":{\"type\":\"text\",\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"car\",\"connection\":\"default\",\"uid\":\"api::car.car\",\"apiName\":\"car\",\"globalId\":\"Car\",\"actions\":{},\"lifecycles\":{}},\"api::circuit.circuit\":{\"kind\":\"collectionType\",\"collectionName\":\"circuits\",\"info\":{\"singularName\":\"circuit\",\"pluralName\":\"circuits\",\"displayName\":\"Circuit\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"description\":{\"type\":\"richtext\"},\"events\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::event.event\",\"mappedBy\":\"circuit\"},\"logo\":{\"allowedTypes\":[\"images\"],\"type\":\"media\",\"multiple\":false,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"circuits\",\"info\":{\"singularName\":\"circuit\",\"pluralName\":\"circuits\",\"displayName\":\"Circuit\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"description\":{\"type\":\"richtext\"},\"events\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::event.event\",\"mappedBy\":\"circuit\"},\"logo\":{\"allowedTypes\":[\"images\"],\"type\":\"media\",\"multiple\":false,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"circuit\",\"connection\":\"default\",\"uid\":\"api::circuit.circuit\",\"apiName\":\"circuit\",\"globalId\":\"Circuit\",\"actions\":{},\"lifecycles\":{}},\"api::event.event\":{\"kind\":\"collectionType\",\"collectionName\":\"events\",\"info\":{\"singularName\":\"event\",\"pluralName\":\"events\",\"displayName\":\"Évènement\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true,\"unique\":true},\"date\":{\"type\":\"datetime\",\"required\":true,\"unique\":false},\"description\":{\"type\":\"richtext\",\"required\":true},\"circuit\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::circuit.circuit\",\"inversedBy\":\"events\"},\"locations\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"ttd.locations\"},\"places\":{\"type\":\"integer\",\"required\":true},\"global_options\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"ttd.options\"},\"classic\":{\"type\":\"component\",\"repeatable\":false,\"component\":\"ttd.acces-piste\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"events\",\"info\":{\"singularName\":\"event\",\"pluralName\":\"events\",\"displayName\":\"Évènement\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true,\"unique\":true},\"date\":{\"type\":\"datetime\",\"required\":true,\"unique\":false},\"description\":{\"type\":\"richtext\",\"required\":true},\"circuit\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::circuit.circuit\",\"inversedBy\":\"events\"},\"locations\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"ttd.locations\"},\"places\":{\"type\":\"integer\",\"required\":true},\"global_options\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"ttd.options\"},\"classic\":{\"type\":\"component\",\"repeatable\":false,\"component\":\"ttd.acces-piste\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"event\",\"connection\":\"default\",\"uid\":\"api::event.event\",\"apiName\":\"event\",\"globalId\":\"Event\",\"actions\":{},\"lifecycles\":{}}}','object',NULL,NULL),
(2,'plugin_content_manager_configuration_components::ttd.acces-piste','{\"uid\":\"ttd.acces-piste\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"price\":{\"edit\":{\"label\":\"price\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"price\",\"searchable\":true,\"sortable\":true}},\"options\":{\"edit\":{\"label\":\"options\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"options\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"price\",\"options\"],\"edit\":[[{\"name\":\"price\",\"size\":4}],[{\"name\":\"options\",\"size\":12}]],\"editRelations\":[]},\"isComponent\":true}','object',NULL,NULL),
(3,'plugin_content_manager_configuration_components::ttd.options','{\"uid\":\"ttd.options\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"price\":{\"edit\":{\"label\":\"price\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"price\",\"searchable\":true,\"sortable\":true}},\"settings\":{\"edit\":{\"label\":\"settings\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"settings\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"name\",\"price\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"price\",\"size\":4}],[{\"name\":\"settings\",\"size\":12}]],\"editRelations\":[]},\"isComponent\":true}','object',NULL,NULL),
(4,'plugin_content_manager_configuration_components::ttd.locations','{\"uid\":\"ttd.locations\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"exclusive_price\":{\"edit\":{\"label\":\"exclusive_price\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"exclusive_price\",\"searchable\":true,\"sortable\":true}},\"car\":{\"edit\":{\"label\":\"car\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"car\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"options\":{\"edit\":{\"label\":\"options\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"options\",\"searchable\":false,\"sortable\":false}},\"serie_format\":{\"edit\":{\"label\":\"serie_format\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"serie_format\",\"searchable\":true,\"sortable\":true}},\"available_series\":{\"edit\":{\"label\":\"available_series\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"available_series\",\"searchable\":true,\"sortable\":true}},\"serie_price\":{\"edit\":{\"label\":\"serie_price\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"serie_price\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"car\",\"name\",\"exclusive_price\"],\"edit\":[[{\"name\":\"car\",\"size\":6}],[{\"name\":\"name\",\"size\":6}],[{\"name\":\"options\",\"size\":12}],[{\"name\":\"exclusive_price\",\"size\":4},{\"name\":\"serie_format\",\"size\":6}],[{\"name\":\"available_series\",\"size\":4},{\"name\":\"serie_price\",\"size\":4}]],\"editRelations\":[]},\"isComponent\":true}','object',NULL,NULL),
(5,'plugin_content_manager_configuration_content_types::admin::permission','{\"uid\":\"admin::permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"subject\":{\"edit\":{\"label\":\"subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"subject\",\"searchable\":true,\"sortable\":true}},\"properties\":{\"edit\":{\"label\":\"properties\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"properties\",\"searchable\":false,\"sortable\":false}},\"conditions\":{\"edit\":{\"label\":\"conditions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"conditions\",\"searchable\":false,\"sortable\":false}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"subject\",\"role\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"subject\",\"size\":6}],[{\"name\":\"properties\",\"size\":12}],[{\"name\":\"conditions\",\"size\":12}]]}}','object',NULL,NULL),
(6,'plugin_content_manager_configuration_content_types::admin::user','{\"uid\":\"admin::user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"firstname\",\"defaultSortBy\":\"firstname\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"firstname\":{\"edit\":{\"label\":\"firstname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"firstname\",\"searchable\":true,\"sortable\":true}},\"lastname\":{\"edit\":{\"label\":\"lastname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastname\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"registrationToken\":{\"edit\":{\"label\":\"registrationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"registrationToken\",\"searchable\":true,\"sortable\":true}},\"isActive\":{\"edit\":{\"label\":\"isActive\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"isActive\",\"searchable\":true,\"sortable\":true}},\"roles\":{\"edit\":{\"label\":\"roles\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"roles\",\"searchable\":false,\"sortable\":false}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"preferedLanguage\":{\"edit\":{\"label\":\"preferedLanguage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preferedLanguage\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"firstname\",\"lastname\",\"username\"],\"editRelations\":[\"roles\"],\"edit\":[[{\"name\":\"firstname\",\"size\":6},{\"name\":\"lastname\",\"size\":6}],[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"resetPasswordToken\",\"size\":6}],[{\"name\":\"registrationToken\",\"size\":6},{\"name\":\"isActive\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4},{\"name\":\"preferedLanguage\",\"size\":6}]]}}','object',NULL,NULL),
(7,'plugin_content_manager_configuration_content_types::admin::role','{\"uid\":\"admin::role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"description\"],\"editRelations\":[\"users\",\"permissions\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}],[{\"name\":\"description\",\"size\":6}]]}}','object',NULL,NULL),
(8,'plugin_content_manager_configuration_content_types::admin::api-token','{\"uid\":\"admin::api-token\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"editRelations\":[],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"accessKey\",\"size\":6}]]}}','object',NULL,NULL),
(9,'plugin_content_manager_configuration_content_types::plugin::upload.file','{\"uid\":\"plugin::upload.file\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"alternativeText\":{\"edit\":{\"label\":\"alternativeText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"alternativeText\",\"searchable\":true,\"sortable\":true}},\"caption\":{\"edit\":{\"label\":\"caption\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"caption\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"height\",\"searchable\":true,\"sortable\":true}},\"formats\":{\"edit\":{\"label\":\"formats\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"formats\",\"searchable\":false,\"sortable\":false}},\"hash\":{\"edit\":{\"label\":\"hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"hash\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"previewUrl\":{\"edit\":{\"label\":\"previewUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"previewUrl\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider_metadata\",\"searchable\":false,\"sortable\":false}},\"folder\":{\"edit\":{\"label\":\"folder\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"folder\",\"searchable\":true,\"sortable\":true}},\"folderPath\":{\"edit\":{\"label\":\"folderPath\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"folderPath\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"alternativeText\",\"caption\"],\"editRelations\":[\"folder\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"alternativeText\",\"size\":6}],[{\"name\":\"caption\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4}],[{\"name\":\"formats\",\"size\":12}],[{\"name\":\"hash\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":4}],[{\"name\":\"url\",\"size\":6},{\"name\":\"previewUrl\",\"size\":6}],[{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}],[{\"name\":\"folderPath\",\"size\":6}]]}}','object',NULL,NULL),
(10,'plugin_content_manager_configuration_content_types::plugin::upload.folder','{\"uid\":\"plugin::upload.folder\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"pathId\":{\"edit\":{\"label\":\"pathId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"pathId\",\"searchable\":true,\"sortable\":true}},\"parent\":{\"edit\":{\"label\":\"parent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"children\":{\"edit\":{\"label\":\"children\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"children\",\"searchable\":false,\"sortable\":false}},\"files\":{\"edit\":{\"label\":\"files\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"files\",\"searchable\":false,\"sortable\":false}},\"path\":{\"edit\":{\"label\":\"path\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"path\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"pathId\",\"parent\"],\"editRelations\":[\"parent\",\"children\",\"files\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"pathId\",\"size\":4}],[{\"name\":\"path\",\"size\":6}]]}}','object',NULL,NULL),
(11,'plugin_content_manager_configuration_content_types::plugin::users-permissions.permission','{\"uid\":\"plugin::users-permissions.permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"role\",\"createdAt\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6}]]}}','object',NULL,NULL),
(12,'plugin_content_manager_configuration_content_types::plugin::users-permissions.role','{\"uid\":\"plugin::users-permissions.role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"editRelations\":[\"permissions\",\"users\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6}]]}}','object',NULL,NULL),
(13,'plugin_content_manager_configuration_content_types::plugin::users-permissions.user','{\"uid\":\"plugin::users-permissions.user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmationToken\":{\"edit\":{\"label\":\"confirmationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"confirmationToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"confirmed\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"confirmed\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"confirmed\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4}]]}}','object',NULL,NULL),
(14,'plugin_content_manager_configuration_content_types::plugin::i18n.locale','{\"uid\":\"plugin::i18n.locale\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"createdAt\"],\"editRelations\":[],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}]]}}','object',NULL,NULL),
(15,'plugin_content_manager_configuration_content_types::api::car.car','{\"uid\":\"api::car.car\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"images\":{\"edit\":{\"label\":\"images\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"images\",\"searchable\":false,\"sortable\":false}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"createdAt\",\"updatedAt\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"images\",\"size\":6}],[{\"name\":\"description\",\"size\":6}]],\"editRelations\":[]}}','object',NULL,NULL),
(16,'plugin_content_manager_configuration_content_types::api::circuit.circuit','{\"uid\":\"api::circuit.circuit\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":false,\"sortable\":false}},\"events\":{\"edit\":{\"label\":\"events\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"events\",\"searchable\":false,\"sortable\":false}},\"logo\":{\"edit\":{\"label\":\"logo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"logo\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"events\",\"createdAt\"],\"edit\":[[{\"name\":\"title\",\"size\":6}],[{\"name\":\"description\",\"size\":12}],[{\"name\":\"logo\",\"size\":6}]],\"editRelations\":[\"events\"]}}','object',NULL,NULL),
(17,'plugin_content_manager_configuration_content_types::api::event.event','{\"uid\":\"api::event.event\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"date\":{\"edit\":{\"label\":\"date\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"date\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":false,\"sortable\":false}},\"circuit\":{\"edit\":{\"label\":\"circuit\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"circuit\",\"searchable\":true,\"sortable\":true}},\"locations\":{\"edit\":{\"label\":\"locations\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"locations\",\"searchable\":false,\"sortable\":false}},\"places\":{\"edit\":{\"label\":\"places\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"places\",\"searchable\":true,\"sortable\":true}},\"global_options\":{\"edit\":{\"label\":\"global_options\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"global_options\",\"searchable\":false,\"sortable\":false}},\"classic\":{\"edit\":{\"label\":\"classic\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"classic\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"date\",\"circuit\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"date\",\"size\":6}],[{\"name\":\"description\",\"size\":12}],[{\"name\":\"locations\",\"size\":12}],[{\"name\":\"places\",\"size\":4}],[{\"name\":\"global_options\",\"size\":12}],[{\"name\":\"classic\",\"size\":12}]],\"editRelations\":[\"circuit\"]}}','object',NULL,NULL),
(18,'plugin_upload_settings','{\"sizeOptimization\":true,\"responsiveDimensions\":true,\"autoOrientation\":false}','object',NULL,NULL),
(19,'plugin_upload_metrics','{\"weeklySchedule\":\"18 51 12 * * 0\",\"lastWeeklyUpdate\":1662288678018}','object',NULL,NULL),
(20,'plugin_users-permissions_grant','{\"email\":{\"enabled\":true,\"icon\":\"envelope\"},\"discord\":{\"enabled\":false,\"icon\":\"discord\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"enabled\":false,\"icon\":\"facebook-square\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"enabled\":false,\"icon\":\"google\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"enabled\":false,\"icon\":\"github\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"enabled\":false,\"icon\":\"windows\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"enabled\":false,\"icon\":\"twitter\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitter/callback\"},\"instagram\":{\"enabled\":false,\"icon\":\"instagram\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/instagram/callback\",\"scope\":[\"user_profile\"]},\"vk\":{\"enabled\":false,\"icon\":\"vk\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/vk/callback\",\"scope\":[\"email\"]},\"twitch\":{\"enabled\":false,\"icon\":\"twitch\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitch/callback\",\"scope\":[\"user:read:email\"]},\"linkedin\":{\"enabled\":false,\"icon\":\"linkedin\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/linkedin/callback\",\"scope\":[\"r_liteprofile\",\"r_emailaddress\"]},\"cognito\":{\"enabled\":false,\"icon\":\"aws\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my.subdomain.com\",\"callback\":\"api/auth/cognito/callback\",\"scope\":[\"email\",\"openid\",\"profile\"]},\"reddit\":{\"enabled\":false,\"icon\":\"reddit\",\"key\":\"\",\"secret\":\"\",\"state\":true,\"callback\":\"api/auth/reddit/callback\",\"scope\":[\"identity\"]},\"auth0\":{\"enabled\":false,\"icon\":\"\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my-tenant.eu\",\"callback\":\"api/auth/auth0/callback\",\"scope\":[\"openid\",\"email\",\"profile\"]},\"cas\":{\"enabled\":false,\"icon\":\"book\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/cas/callback\",\"scope\":[\"openid email\"],\"subdomain\":\"my.subdomain.com/cas\"}}','object',NULL,NULL),
(21,'plugin_users-permissions_email','{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"sync\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}','object',NULL,NULL),
(22,'plugin_users-permissions_advanced','{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_reset_password\":null,\"email_confirmation_redirection\":null,\"default_role\":\"authenticated\"}','object',NULL,NULL),
(23,'plugin_i18n_default_locale','\"en\"','string',NULL,NULL),
(24,'core_admin_auth','{\"providers\":{\"autoRegister\":false,\"defaultRole\":null}}','object',NULL,NULL);
/*!40000 ALTER TABLE `strapi_core_store_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_database_schema`
--

DROP TABLE IF EXISTS `strapi_database_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_database_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schema` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_database_schema`
--

LOCK TABLES `strapi_database_schema` WRITE;
/*!40000 ALTER TABLE `strapi_database_schema` DISABLE KEYS */;
INSERT INTO `strapi_database_schema` VALUES
(13,'{\"tables\":[{\"name\":\"strapi_core_store_settings\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"key\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"value\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"environment\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tag\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"strapi_webhooks\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"url\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"headers\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"events\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"enabled\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"admin_permissions\",\"indexes\":[{\"name\":\"admin_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"subject\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"properties\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"conditions\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_users\",\"indexes\":[{\"name\":\"admin_users_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_users_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"firstname\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"lastname\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"username\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"email\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"password\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"reset_password_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"registration_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"is_active\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"blocked\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"prefered_language\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_roles\",\"indexes\":[{\"name\":\"admin_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"code\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_api_tokens\",\"indexes\":[{\"name\":\"strapi_api_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_api_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_api_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_api_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"access_key\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files\",\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null},{\"name\":\"files_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"files_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"files_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"files_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"alternative_text\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"caption\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"width\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"height\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"formats\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"hash\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ext\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"mime\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"size\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"url\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"preview_url\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider_metadata\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"folder_path\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"upload_folders\",\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"},{\"name\":\"upload_folders_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"upload_folders_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"upload_folders_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"upload_folders_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"path_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"path\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"i18n_locale\",\"indexes\":[{\"name\":\"i18n_locale_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"i18n_locale_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"i18n_locale_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"i18n_locale_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"code\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_permissions\",\"indexes\":[{\"name\":\"up_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_roles\",\"indexes\":[{\"name\":\"up_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_users\",\"indexes\":[{\"name\":\"up_users_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_users_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"username\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"email\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"password\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"reset_password_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"confirmation_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"confirmed\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"blocked\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"cars\",\"indexes\":[{\"name\":\"cars_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"cars_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"cars_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"cars_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"circuits\",\"indexes\":[{\"name\":\"circuits_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"circuits_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"circuits_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"circuits_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"title\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"events\",\"indexes\":[{\"name\":\"events_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"events_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"events_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"events_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"title\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"date\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"places\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"components_ttd_acces_pistes\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"price\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"components_ttd_locations\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"exclusive_price\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"serie_format\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"available_series\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"serie_price\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"components_ttd_options\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"price\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"settings\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"admin_permissions_role_links\",\"indexes\":[{\"name\":\"admin_permissions_role_links_fk\",\"columns\":[\"permission_id\"]},{\"name\":\"admin_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"]}],\"foreignKeys\":[{\"name\":\"admin_permissions_role_links_fk\",\"columns\":[\"permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"admin_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_users_roles_links\",\"indexes\":[{\"name\":\"admin_users_roles_links_fk\",\"columns\":[\"user_id\"]},{\"name\":\"admin_users_roles_links_inv_fk\",\"columns\":[\"role_id\"]}],\"foreignKeys\":[{\"name\":\"admin_users_roles_links_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_users\",\"onDelete\":\"CASCADE\"},{\"name\":\"admin_users_roles_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files_related_morphs\",\"indexes\":[{\"name\":\"files_related_morphs_fk\",\"columns\":[\"file_id\"]}],\"foreignKeys\":[{\"name\":\"files_related_morphs_fk\",\"columns\":[\"file_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"files\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"file_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"related_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"related_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"field\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"order\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files_folder_links\",\"indexes\":[{\"name\":\"files_folder_links_fk\",\"columns\":[\"file_id\"]},{\"name\":\"files_folder_links_inv_fk\",\"columns\":[\"folder_id\"]}],\"foreignKeys\":[{\"name\":\"files_folder_links_fk\",\"columns\":[\"file_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"files\",\"onDelete\":\"CASCADE\"},{\"name\":\"files_folder_links_inv_fk\",\"columns\":[\"folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"file_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"upload_folders_parent_links\",\"indexes\":[{\"name\":\"upload_folders_parent_links_fk\",\"columns\":[\"folder_id\"]},{\"name\":\"upload_folders_parent_links_inv_fk\",\"columns\":[\"inv_folder_id\"]}],\"foreignKeys\":[{\"name\":\"upload_folders_parent_links_fk\",\"columns\":[\"folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"},{\"name\":\"upload_folders_parent_links_inv_fk\",\"columns\":[\"inv_folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"inv_folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_permissions_role_links\",\"indexes\":[{\"name\":\"up_permissions_role_links_fk\",\"columns\":[\"permission_id\"]},{\"name\":\"up_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"]}],\"foreignKeys\":[{\"name\":\"up_permissions_role_links_fk\",\"columns\":[\"permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"up_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_users_role_links\",\"indexes\":[{\"name\":\"up_users_role_links_fk\",\"columns\":[\"user_id\"]},{\"name\":\"up_users_role_links_inv_fk\",\"columns\":[\"role_id\"]}],\"foreignKeys\":[{\"name\":\"up_users_role_links_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"},{\"name\":\"up_users_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"events_components\",\"indexes\":[{\"name\":\"events_field_index\",\"columns\":[\"field\"],\"type\":null},{\"name\":\"events_component_type_index\",\"columns\":[\"component_type\"],\"type\":null},{\"name\":\"events_entity_fk\",\"columns\":[\"entity_id\"]}],\"foreignKeys\":[{\"name\":\"events_entity_fk\",\"columns\":[\"entity_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"events\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"entity_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"field\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"order\",\"type\":\"integer\",\"args\":[],\"defaultTo\":0,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"events_circuit_links\",\"indexes\":[{\"name\":\"events_circuit_links_fk\",\"columns\":[\"event_id\"]},{\"name\":\"events_circuit_links_inv_fk\",\"columns\":[\"circuit_id\"]}],\"foreignKeys\":[{\"name\":\"events_circuit_links_fk\",\"columns\":[\"event_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"events\",\"onDelete\":\"CASCADE\"},{\"name\":\"events_circuit_links_inv_fk\",\"columns\":[\"circuit_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"circuits\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"event_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"circuit_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"components_ttd_acces_pistes_components\",\"indexes\":[{\"name\":\"components_ttd_acces_pistes_field_index\",\"columns\":[\"field\"],\"type\":null},{\"name\":\"components_ttd_acces_pistes_component_type_index\",\"columns\":[\"component_type\"],\"type\":null},{\"name\":\"components_ttd_acces_pistes_entity_fk\",\"columns\":[\"entity_id\"]}],\"foreignKeys\":[{\"name\":\"components_ttd_acces_pistes_entity_fk\",\"columns\":[\"entity_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"components_ttd_acces_pistes\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"entity_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"field\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"order\",\"type\":\"integer\",\"args\":[],\"defaultTo\":0,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"components_ttd_locations_components\",\"indexes\":[{\"name\":\"components_ttd_locations_field_index\",\"columns\":[\"field\"],\"type\":null},{\"name\":\"components_ttd_locations_component_type_index\",\"columns\":[\"component_type\"],\"type\":null},{\"name\":\"components_ttd_locations_entity_fk\",\"columns\":[\"entity_id\"]}],\"foreignKeys\":[{\"name\":\"components_ttd_locations_entity_fk\",\"columns\":[\"entity_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"components_ttd_locations\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"entity_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"component_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"field\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"order\",\"type\":\"integer\",\"args\":[],\"defaultTo\":0,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"components_ttd_locations_car_links\",\"indexes\":[{\"name\":\"components_ttd_locations_car_links_fk\",\"columns\":[\"locations_id\"]},{\"name\":\"components_ttd_locations_car_links_inv_fk\",\"columns\":[\"car_id\"]}],\"foreignKeys\":[{\"name\":\"components_ttd_locations_car_links_fk\",\"columns\":[\"locations_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"components_ttd_locations\",\"onDelete\":\"CASCADE\"},{\"name\":\"components_ttd_locations_car_links_inv_fk\",\"columns\":[\"car_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"cars\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"locations_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"car_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]}]}','2022-09-10 16:05:33','0624dc575354fc6183d204a4b11ee935');
/*!40000 ALTER TABLE `strapi_database_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_migrations`
--

DROP TABLE IF EXISTS `strapi_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_migrations`
--

LOCK TABLES `strapi_migrations` WRITE;
/*!40000 ALTER TABLE `strapi_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_webhooks`
--

DROP TABLE IF EXISTS `strapi_webhooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`headers`)),
  `events` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`events`)),
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_webhooks`
--

LOCK TABLES `strapi_webhooks` WRITE;
/*!40000 ALTER TABLE `strapi_webhooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_webhooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_permissions`
--

DROP TABLE IF EXISTS `up_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_permissions_created_by_id_fk` (`created_by_id`),
  KEY `up_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_permissions`
--

LOCK TABLES `up_permissions` WRITE;
/*!40000 ALTER TABLE `up_permissions` DISABLE KEYS */;
INSERT INTO `up_permissions` VALUES
(1,'plugin::users-permissions.user.me','2022-09-04 12:14:19.125000','2022-09-04 12:14:19.125000',NULL,NULL),
(2,'plugin::users-permissions.auth.changePassword','2022-09-04 12:14:19.125000','2022-09-04 12:14:19.125000',NULL,NULL),
(3,'plugin::users-permissions.auth.callback','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(4,'plugin::users-permissions.auth.connect','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(5,'plugin::users-permissions.auth.forgotPassword','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(6,'plugin::users-permissions.auth.resetPassword','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(7,'plugin::users-permissions.auth.register','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(8,'plugin::users-permissions.auth.emailConfirmation','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(9,'plugin::users-permissions.auth.sendEmailConfirmation','2022-09-04 12:14:19.146000','2022-09-04 12:14:19.146000',NULL,NULL),
(10,'api::circuit.circuit.find','2022-09-05 16:27:44.356000','2022-09-05 16:27:44.356000',NULL,NULL),
(11,'api::event.event.find','2022-09-05 16:34:39.931000','2022-09-05 16:34:39.931000',NULL,NULL),
(13,'api::circuit.circuit.findOne','2022-09-05 18:33:34.516000','2022-09-05 18:33:34.516000',NULL,NULL);
/*!40000 ALTER TABLE `up_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_permissions_role_links`
--

DROP TABLE IF EXISTS `up_permissions_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_permissions_role_links` (
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `up_permissions_role_links_fk` (`permission_id`),
  KEY `up_permissions_role_links_inv_fk` (`role_id`),
  CONSTRAINT `up_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `up_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_permissions_role_links`
--

LOCK TABLES `up_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `up_permissions_role_links` DISABLE KEYS */;
INSERT INTO `up_permissions_role_links` VALUES
(1,1,1),
(2,1,2),
(3,2,3),
(8,2,4),
(7,2,5),
(5,2,6),
(6,2,7),
(9,2,8),
(4,2,9),
(10,2,10),
(11,2,11),
(13,2,13);
/*!40000 ALTER TABLE `up_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_roles`
--

DROP TABLE IF EXISTS `up_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_roles_created_by_id_fk` (`created_by_id`),
  KEY `up_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_roles`
--

LOCK TABLES `up_roles` WRITE;
/*!40000 ALTER TABLE `up_roles` DISABLE KEYS */;
INSERT INTO `up_roles` VALUES
(1,'Authenticated','Default role given to authenticated user.','authenticated','2022-09-04 12:14:19.112000','2022-09-04 12:14:19.112000',NULL,NULL),
(2,'Public','Default role given to unauthenticated user.','public','2022-09-04 12:14:19.117000','2022-09-05 18:33:34.496000',NULL,NULL);
/*!40000 ALTER TABLE `up_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_users`
--

DROP TABLE IF EXISTS `up_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_users_created_by_id_fk` (`created_by_id`),
  KEY `up_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users`
--

LOCK TABLES `up_users` WRITE;
/*!40000 ALTER TABLE `up_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `up_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_users_role_links`
--

DROP TABLE IF EXISTS `up_users_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_users_role_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `up_users_role_links_fk` (`user_id`),
  KEY `up_users_role_links_inv_fk` (`role_id`),
  CONSTRAINT `up_users_role_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_users_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users_role_links`
--

LOCK TABLES `up_users_role_links` WRITE;
/*!40000 ALTER TABLE `up_users_role_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `up_users_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upload_folders`
--

DROP TABLE IF EXISTS `upload_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upload_folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_folders_path_id_index` (`path_id`),
  UNIQUE KEY `upload_folders_path_index` (`path`),
  KEY `upload_folders_created_by_id_fk` (`created_by_id`),
  KEY `upload_folders_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `upload_folders_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `upload_folders_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_folders`
--

LOCK TABLES `upload_folders` WRITE;
/*!40000 ALTER TABLE `upload_folders` DISABLE KEYS */;
INSERT INTO `upload_folders` VALUES
(1,'Voiture',1,'/1','2022-09-10 09:39:03.099000','2022-09-10 09:39:03.099000',1,1),
(2,'m3',2,'/1/2','2022-09-10 09:39:14.392000','2022-09-10 09:39:14.392000',1,1),
(3,'clubsport',3,'/1/3','2022-09-10 10:15:50.828000','2022-09-10 10:15:50.828000',1,1);
/*!40000 ALTER TABLE `upload_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upload_folders_parent_links`
--

DROP TABLE IF EXISTS `upload_folders_parent_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upload_folders_parent_links` (
  `folder_id` int(10) unsigned DEFAULT NULL,
  `inv_folder_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `upload_folders_parent_links_fk` (`folder_id`),
  KEY `upload_folders_parent_links_inv_fk` (`inv_folder_id`),
  CONSTRAINT `upload_folders_parent_links_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `upload_folders_parent_links_inv_fk` FOREIGN KEY (`inv_folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_folders_parent_links`
--

LOCK TABLES `upload_folders_parent_links` WRITE;
/*!40000 ALTER TABLE `upload_folders_parent_links` DISABLE KEYS */;
INSERT INTO `upload_folders_parent_links` VALUES
(2,1,1),
(3,1,2);
/*!40000 ALTER TABLE `upload_folders_parent_links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-10 19:10:56
