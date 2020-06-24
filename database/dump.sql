--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."ownedDogs" DROP CONSTRAINT "ownedDogs_fk1";
ALTER TABLE ONLY public."ownedDogs" DROP CONSTRAINT "ownedDogs_fk0";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY public."dogsBreeds" DROP CONSTRAINT "dogsBreeds_pk";
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."ownedDogs" ALTER COLUMN "ownedDogId" DROP DEFAULT;
ALTER TABLE public."dogsBreeds" ALTER COLUMN "breedId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."ownedDogs_ownedDogId_seq";
DROP TABLE public."ownedDogs";
DROP SEQUENCE public."dogsBreeds_breedId_seq";
DROP TABLE public."dogsBreeds";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dogsBreeds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."dogsBreeds" (
    "breedId" integer NOT NULL,
    breed text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    "imageUrl" text NOT NULL,
    temperament text NOT NULL,
    "historicalUsage" text NOT NULL
);


--
-- Name: dogsBreeds_breedId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."dogsBreeds_breedId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dogsBreeds_breedId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."dogsBreeds_breedId_seq" OWNED BY public."dogsBreeds"."breedId";


--
-- Name: ownedDogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ownedDogs" (
    "ownedDogId" integer NOT NULL,
    "userId" integer NOT NULL,
    "breedId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: ownedDogs_ownedDogId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ownedDogs_ownedDogId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ownedDogs_ownedDogId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ownedDogs_ownedDogId_seq" OWNED BY public."ownedDogs"."ownedDogId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: dogsBreeds breedId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."dogsBreeds" ALTER COLUMN "breedId" SET DEFAULT nextval('public."dogsBreeds_breedId_seq"'::regclass);


--
-- Name: ownedDogs ownedDogId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ownedDogs" ALTER COLUMN "ownedDogId" SET DEFAULT nextval('public."ownedDogs_ownedDogId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: dogsBreeds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."dogsBreeds" ("breedId", breed, "shortDescription", "longDescription", "imageUrl", temperament, "historicalUsage") FROM stdin;
\.


--
-- Data for Name: ownedDogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ownedDogs" ("ownedDogId", "userId", "breedId", name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", username, email) FROM stdin;
\.


--
-- Name: dogsBreeds_breedId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."dogsBreeds_breedId_seq"', 1, false);


--
-- Name: ownedDogs_ownedDogId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ownedDogs_ownedDogId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: dogsBreeds dogsBreeds_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."dogsBreeds"
    ADD CONSTRAINT "dogsBreeds_pk" PRIMARY KEY ("breedId");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: ownedDogs ownedDogs_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ownedDogs"
    ADD CONSTRAINT "ownedDogs_fk0" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: ownedDogs ownedDogs_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ownedDogs"
    ADD CONSTRAINT "ownedDogs_fk1" FOREIGN KEY ("breedId") REFERENCES public."dogsBreeds"("breedId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

