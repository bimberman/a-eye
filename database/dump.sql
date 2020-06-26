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
ALTER TABLE ONLY public.breeds DROP CONSTRAINT "dogBreeds_pk";
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."ownedDogs" ALTER COLUMN "ownedDogId" DROP DEFAULT;
ALTER TABLE public.breeds ALTER COLUMN "breedId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."ownedDogs_ownedDogId_seq";
DROP TABLE public."ownedDogs";
DROP SEQUENCE public."dogBreeds_breedId_seq";
DROP TABLE public.breeds;
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
-- Name: breeds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.breeds (
    "breedId" integer NOT NULL,
    name text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    "imageUrl" text NOT NULL,
    temperament text NOT NULL,
    "historicalUsage" text NOT NULL,
    "apiKeyWord" text
);


--
-- Name: dogBreeds_breedId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."dogBreeds_breedId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dogBreeds_breedId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."dogBreeds_breedId_seq" OWNED BY public.breeds."breedId";


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
-- Name: breeds breedId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.breeds ALTER COLUMN "breedId" SET DEFAULT nextval('public."dogBreeds_breedId_seq"'::regclass);


--
-- Name: ownedDogs ownedDogId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ownedDogs" ALTER COLUMN "ownedDogId" SET DEFAULT nextval('public."ownedDogs_ownedDogId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.breeds ("breedId", name, "shortDescription", "longDescription", "imageUrl", temperament, "historicalUsage", "apiKeyWord") FROM stdin;
2	Pug	Pugs have wrinkly, short-muzzled face, and curled tail. The breed has a fine, glossy coat that comes in a variety of colours, most often fawn or black, and a compact square body with well-developed muscles.	The Pug’s motto is the Latin phrase “multum in parvo” (a lot in a little)—an apt description of this small but muscular breed. They come in three colors: silver or apricot-fawn with a black face mask, or all black. The large round head, the big, sparkling eyes, and the wrinkled brow give Pugs a range of human-like expressions—surprise, happiness, curiosity—that have delighted owners for centuries. Pug owners say their breed is the ideal house dog. Pugs are happy in the city or country, with kids or old folks, as an only pet or in a pack. They enjoy their food, and care must be taken to keep them trim. They do best in moderate climates—not too hot, not too cold—but, with proper care, Pugs can be their adorable selves anywhere.	/images/pug.jpg	Charming, Mischievous, Loving	The Pug’s career as citizen of the world began sometime in the 1500s, when Dutch traders returned to Europe with specimens of the breed. Legend holds that the Pug became the mascot of Holland’s royal House of Orange when a Pug save the life of the Prince of Orange by barking to warn the prince of an attack on his camp by Spanish troops. When William and Mary of Orange arrived in England to assume the monarchy, their Pugs accompanied them and began a craze for the breed among the British.	pug
1	Dalmatian	Dalmatians have a white coat with black or liver color spots. They typically standing between 19 and 23 inches at the shoulder.	The Dalmatian is a distinctively spotted dog; poised and alert; strong, muscular and active; free of shyness; intelligent in expression; symmetrical in outline; and without exaggeration or coarseness. The Dalmatian is capable of great endurance, combined with fair amount of speed. Deviations from the described ideal should be penalized in direct proportion to the degree of the deviation.	/images/dalmatian.jpg	Reserved and dignified, Dals can be aloof with strangers and are dependable watchdogs. With their preferred humans, Dals are bright, loyal, and loving house dogs. They are strong, active athletes with great stamina—a wonderful partner for runners and hikers.	Dalmatians have a job description unique among AKC breeds: coach dog. Their traditional occupation was to trot beside horse-drawn coaches, and to guard the horses and rig when otherwise unattended. Dals were alongside the caravans of the Romani people, commonly known as gypsies, during their ceaseless wanderings around Europe. This association with the peripatetic Romani helps explain why Dal origins are so difficult to pin down—as with the gypsies themselves, the world was their home.	dalmatian
\.


--
-- Data for Name: ownedDogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ownedDogs" ("ownedDogId", "userId", "breedId", name) FROM stdin;
1	1	2	Doggo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", username, email) FROM stdin;
1	Serin	serin@email.com
\.


--
-- Name: dogBreeds_breedId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."dogBreeds_breedId_seq"', 2, true);


--
-- Name: ownedDogs_ownedDogId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ownedDogs_ownedDogId_seq"', 1, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, true);


--
-- Name: breeds dogBreeds_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT "dogBreeds_pk" PRIMARY KEY ("breedId");


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
    ADD CONSTRAINT "ownedDogs_fk1" FOREIGN KEY ("breedId") REFERENCES public.breeds("breedId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

