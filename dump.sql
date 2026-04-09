--
-- PostgreSQL database dump
--

\restrict fDawZKU32vNaKTzAfs3YcZ9b9DrcuG9BW04ZIdvP8kzaWisyzZtCJlgiy8lNdWd

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    appointment_id integer NOT NULL,
    p_id integer,
    d_id integer,
    r_id integer,
    appointment_date date,
    appointment_time time without time zone,
    appointment_status character varying(20) DEFAULT 'Scheduled'::character varying
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: appointment_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_appointment_id_seq OWNER TO postgres;

--
-- Name: appointment_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_appointment_id_seq OWNED BY public.appointment.appointment_id;


--
-- Name: doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor (
    d_id integer NOT NULL,
    d_name character varying(100),
    d_phone character varying(15),
    d_spec character varying(100),
    d_password character varying(255),
    d_mail character varying(50)
);


ALTER TABLE public.doctor OWNER TO postgres;

--
-- Name: doctor_availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_availability (
    availability_id integer NOT NULL,
    d_id integer,
    available_date date,
    enter_time time without time zone,
    leave_time time without time zone
);


ALTER TABLE public.doctor_availability OWNER TO postgres;

--
-- Name: doctor_availability_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_availability_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_availability_availability_id_seq OWNER TO postgres;

--
-- Name: doctor_availability_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_availability_availability_id_seq OWNED BY public.doctor_availability.availability_id;


--
-- Name: doctor_d_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_d_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_d_id_seq OWNER TO postgres;

--
-- Name: doctor_d_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_d_id_seq OWNED BY public.doctor.d_id;


--
-- Name: patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient (
    p_id integer NOT NULL,
    p_name character varying(100),
    p_phone character varying(15),
    p_mail character varying(100),
    p_password character varying(255),
    p_blood character varying(5),
    p_age integer,
    p_address character varying(255)
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- Name: patient_p_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patient_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patient_p_id_seq OWNER TO postgres;

--
-- Name: patient_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_p_id_seq OWNED BY public.patient.p_id;


--
-- Name: preference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.preference (
    preference_id integer NOT NULL,
    p_id integer,
    preference_date date,
    preference_time time without time zone,
    preference_status character varying(20) DEFAULT 'Pending'::character varying
);


ALTER TABLE public.preference OWNER TO postgres;

--
-- Name: preference_preference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.preference_preference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.preference_preference_id_seq OWNER TO postgres;

--
-- Name: preference_preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.preference_preference_id_seq OWNED BY public.preference.preference_id;


--
-- Name: receptionist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receptionist (
    r_id integer NOT NULL,
    r_name character varying(100),
    r_phone character varying(15),
    r_mail character varying(100),
    r_password character varying(255)
);


ALTER TABLE public.receptionist OWNER TO postgres;

--
-- Name: receptionist_r_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receptionist_r_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.receptionist_r_id_seq OWNER TO postgres;

--
-- Name: receptionist_r_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receptionist_r_id_seq OWNED BY public.receptionist.r_id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    report_id integer NOT NULL,
    p_id integer,
    d_id integer,
    diagnosis character varying(255),
    prescription character varying(255),
    test_results character varying(255)
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_report_id_seq OWNER TO postgres;

--
-- Name: reports_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_report_id_seq OWNED BY public.reports.report_id;


--
-- Name: appointment appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointment_appointment_id_seq'::regclass);


--
-- Name: doctor d_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor ALTER COLUMN d_id SET DEFAULT nextval('public.doctor_d_id_seq'::regclass);


--
-- Name: doctor_availability availability_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_availability ALTER COLUMN availability_id SET DEFAULT nextval('public.doctor_availability_availability_id_seq'::regclass);


--
-- Name: patient p_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient ALTER COLUMN p_id SET DEFAULT nextval('public.patient_p_id_seq'::regclass);


--
-- Name: preference preference_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preference ALTER COLUMN preference_id SET DEFAULT nextval('public.preference_preference_id_seq'::regclass);


--
-- Name: receptionist r_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receptionist ALTER COLUMN r_id SET DEFAULT nextval('public.receptionist_r_id_seq'::regclass);


--
-- Name: reports report_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN report_id SET DEFAULT nextval('public.reports_report_id_seq'::regclass);


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (appointment_id, p_id, d_id, r_id, appointment_date, appointment_time, appointment_status) FROM stdin;
1	1	1	1	2026-04-04	19:00:00	Scheduled
2	1	1	1	2026-04-04	19:00:00	Scheduled
3	1	1	1	2026-04-04	19:04:00	Scheduled
4	1	1	1	2026-04-04	22:06:00	Scheduled
5	1	1	1	2026-04-05	03:05:00	Scheduled
6	1	1	1	2026-04-05	03:08:00	Scheduled
7	1	1	1	2026-04-05	03:08:00	Scheduled
8	1	1	1	2026-04-05	03:10:00	Scheduled
9	1	1	1	2026-04-05	14:45:00	Scheduled
10	1	1	1	2026-04-05	14:45:00	Scheduled
\.


--
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor (d_id, d_name, d_phone, d_spec, d_password, d_mail) FROM stdin;
1	Aravind	\N	\N	$2b$10$XXYM.zXPAGNWql9gN4INQOTRKFHgO9YWc3kbiNaZE97knj3fbfpUO	ara123
\.


--
-- Data for Name: doctor_availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_availability (availability_id, d_id, available_date, enter_time, leave_time) FROM stdin;
1	1	2026-04-04	18:47:00	20:47:00
2	1	2026-04-04	21:52:00	23:54:00
3	1	2026-04-05	02:05:00	04:05:00
4	1	2026-04-05	12:41:00	20:04:00
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient (p_id, p_name, p_phone, p_mail, p_password, p_blood, p_age, p_address) FROM stdin;
1	aileen	7012929893	aileen_b240122cs@nitc.ac.in	$2b$10$zWep/stGuZ2xXo5NPverQelqQMnRj9.LAhc5t6Zbd82JvDpgFIMrm	B+	19	Angamaly
\.


--
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.preference (preference_id, p_id, preference_date, preference_time, preference_status) FROM stdin;
2	1	2026-04-04	19:00:00	completed
3	1	2026-04-04	19:09:00	completed
4	1	2026-04-04	22:07:00	completed
5	1	2026-04-05	03:05:00	completed
6	1	2026-04-05	14:44:00	completed
7	1	2026-04-05	14:45:00	completed
\.


--
-- Data for Name: receptionist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receptionist (r_id, r_name, r_phone, r_mail, r_password) FROM stdin;
1	Reena	\N	reena123@gmail.com	$2b$10$/9GEQoiTlY/sbdR/Ukt89ezE9tnyhwsX8pl/0L2xNxRqGnJwdXRby
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (report_id, p_id, d_id, diagnosis, prescription, test_results) FROM stdin;
1	1	1	Cold	Paracetamol	NIL
2	1	1	NIL	NIL	NIL
3	1	1	Cold	Panadol	NIL
4	1	1	Fever	Paracetamol	NIL
\.


--
-- Name: appointment_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_appointment_id_seq', 10, true);


--
-- Name: doctor_availability_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_availability_availability_id_seq', 4, true);


--
-- Name: doctor_d_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_d_id_seq', 1, true);


--
-- Name: patient_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_p_id_seq', 1, true);


--
-- Name: preference_preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.preference_preference_id_seq', 7, true);


--
-- Name: receptionist_r_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receptionist_r_id_seq', 1, true);


--
-- Name: reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_report_id_seq', 4, true);


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (appointment_id);


--
-- Name: doctor_availability doctor_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_availability
    ADD CONSTRAINT doctor_availability_pkey PRIMARY KEY (availability_id);


--
-- Name: doctor doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_pkey PRIMARY KEY (d_id);


--
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (p_id);


--
-- Name: preference preference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT preference_pkey PRIMARY KEY (preference_id);


--
-- Name: receptionist receptionist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receptionist
    ADD CONSTRAINT receptionist_pkey PRIMARY KEY (r_id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (report_id);


--
-- Name: appointment appointment_d_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_d_id_fkey FOREIGN KEY (d_id) REFERENCES public.doctor(d_id);


--
-- Name: appointment appointment_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.patient(p_id);


--
-- Name: appointment appointment_r_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_r_id_fkey FOREIGN KEY (r_id) REFERENCES public.receptionist(r_id);


--
-- Name: doctor_availability doctor_availability_d_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_availability
    ADD CONSTRAINT doctor_availability_d_id_fkey FOREIGN KEY (d_id) REFERENCES public.doctor(d_id);


--
-- Name: preference preference_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT preference_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.patient(p_id);


--
-- Name: reports reports_d_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_d_id_fkey FOREIGN KEY (d_id) REFERENCES public.doctor(d_id);


--
-- Name: reports reports_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.patient(p_id);


--
-- PostgreSQL database dump complete
--

\unrestrict fDawZKU32vNaKTzAfs3YcZ9b9DrcuG9BW04ZIdvP8kzaWisyzZtCJlgiy8lNdWd

