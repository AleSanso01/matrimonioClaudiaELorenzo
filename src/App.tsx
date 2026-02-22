import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Separator } from "./components/ui/separator";
import {
  Heart,
  MapPin,
  Clock,
  Gift,
  Phone,
  Sparkles,
  Church,
  PartyPopper,
  PartyPopperIcon,
  LucidePartyPopper,
} from "lucide-react";
import "./styles/globals.css";
export default function App() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "duplicate" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    allergie: "",
    accompagnatori: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "Invio in corso..." });

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyQRGuWy9A1BOj7Gp5-ugbVPRxP0su_eResAtGl6WHTUSshpUJQ17SpUL05PpLXR6-WjA/exec";
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("cognome", formData.cognome);
      formDataToSend.append("allergie", formData.allergie);
      formDataToSend.append("accompagnatori", formData.accompagnatori);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.result >= "2") {
        setSubmitStatus({
          type: "success",
          message: "✅ Successo! Abbiamo ricevuto la tua conferma.",
        });
        setRsvpSubmitted(true);
        setFormData({
          nome: "",
          cognome: "",
          allergie: "",
          accompagnatori: "",
        });
      } else if (result.result === "duplicate") {
        setSubmitStatus({
          type: "duplicate",
          message: "⚠️ Utente già presente (Duplicato).",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "❌ Errore di rete! Riprova più tardi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showIban, setShowIban] = useState(false);
  const iban = "IT78A0366901600500178709268";
  const intestatorio = "Claudia Bandini";
  const banca = "Revolut";
  const copyIban = () => {
    navigator.clipboard.writeText(iban);
    alert("IBAN copiato negli appunti!");
  };

  return (
    <div className="min-h-screen paper-texture">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 text-center">
        {/*  
      section per ridurre lo spazio bianco sotto la data del matrimonio
      <section className="relative pt-12 pb-6 md:pt-20 md:pb-10 px-4 text-center">*/}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Heart className="w-10 h-10 mx-auto mb-6 text-rose-500 drop-shadow-sm" />
            <h1 className="text-6xl min-[450px]:text-7xl md:text-8xl mb-6 text-gray-800 font-serif text-shadow-soft">
              {/*  Maremma <br /> ci si sposa*/}
              Claudia & Lorenzo
            </h1>
          </div>
          <h1 className="text-6xl min-[450px]:text-7xl md:text-8xl mb-6 text-gray-800 font-serif text-shadow-soft text-rose-600">
            {/* Claudia & Lorenzo*/}
            13 06 2026
          </h1>
          <div className="text-2xl md:text-4xl text-gray-700 mb-8 space-y-2 font-serif text-center">
            {/*<p className="text-5xl min-[450px]:text-6xl md:text-8xl text-rose-600 font-bold font-numbers tracking-tight leading-none my-4">
              13 06 2026
            </p>*/}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 px-4 bg-rose-50/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-gray-800 font-serif text-shadow-soft leading-tight">
            {/*Invia la tua partecipazione entro il*/}
            Confermate la vostra presenza entro il
          </h2>
          {/*<p className="text-center w-full text-5xl min-[450px]:text-6xl md:text-8xl text-rose-600 font-bold font-numbers tracking-tight leading-none my-4">
            31 04 2026
          </p>*/}
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-rose-600 font-serif text-shadow-soft leading-tight">
            31 04 2026
          </h2>

          {rsvpSubmitted ? (
            <Card className="bg-cream backdrop-paper shadow-paper">
              <CardContent className="pt-8 text-center pb-8">
                <Heart className="w-12 h-12 mx-auto text-rose-500 mb-4 drop-shadow-sm" />
                <h3 className="text-4xl text-gray-800 mb-4 font-serif">
                  Grazie!
                </h3>
                <p className="text-2xl text-gray-700 font-serif">
                  Abbiamo ricevuto la tua conferma, a presto!
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-cream backdrop-paper shadow-paper">
              <CardContent className="pt-8 px-6 pb-8">
                <form onSubmit={handleRSVPSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="nome"
                        className="text-2xl text-gray-700 font-serif mb-2 block"
                      >
                        Nome
                      </Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={(e) =>
                          handleInputChange("nome", e.target.value)
                        }
                        placeholder="Obi-wan"
                        required
                        disabled={isSubmitting}
                        className="bg-cream-light border-rose-200 focus:border-rose-400 font-serif text-xl h-12"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cognome"
                        className="text-2xl text-gray-700 font-serif mb-2 block"
                      >
                        Cognome
                      </Label>
                      <Input
                        id="cognome"
                        name="cognome"
                        value={formData.cognome}
                        onChange={(e) =>
                          handleInputChange("cognome", e.target.value)
                        }
                        placeholder="Kenobi"
                        required
                        disabled={isSubmitting}
                        className="bg-cream-light border-rose-200 focus:border-rose-400 font-serif text-xl h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="accompagnatori"
                      className="text-2xl text-gray-700 font-serif mb-2 block"
                    >
                      Accompagnatori
                    </Label>
                    <Textarea
                      id="accompagnatori"
                      name="accompagnatori"
                      value={formData.accompagnatori}
                      onChange={(e) =>
                        handleInputChange("accompagnatori", e.target.value)
                      }
                      placeholder="Anakin Skywalker, Chewbecca "
                      disabled={isSubmitting}
                      className="min-h-[100px] bg-cream-light border-rose-200 focus:border-rose-400 font-serif text-xl"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="allergie"
                      className="text-2xl text-gray-700 font-serif mb-2 block"
                    >
                      Intolleranze
                    </Label>
                    <Textarea
                      id="allergie"
                      name="allergie"
                      value={formData.allergie}
                      onChange={(e) =>
                        handleInputChange("allergie", e.target.value)
                      }
                      placeholder="Lattosio, Nickel, Glutine..."
                      disabled={isSubmitting}
                      className="min-h-[100px] bg-cream-light border-rose-200 focus:border-rose-400 font-serif text-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-8 shadow-paper transition-all duration-300 font-serif text-3xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Invio..." : "Invia partecipazione"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer & Info */}
      <footer className="py-12 md:py-16 px-4 bg-rose-50/30">
        <div className="max-w-4xl mx-auto flex justify-center mb-12">
          <Card className="bg-cream backdrop-paper border-rose-200 shadow-paper max-w-lg w-full">
            <CardHeader className="text-center">
              <Gift className="w-10 h-10 mx-auto mb-2 text-rose-500 drop-shadow-sm" />
              <CardTitle className="text-4xl text-rose-500 font-serif">
                Regalo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-medium font-serif underline decoration-rose-200">
                Il regalo più grande per noi sarà celebrare e festeggiare questo
                giorno insieme a voi. Se desiderate farci un dono, saremmo
                felici di ricevere un contributo per aiutarci a costruire il
                nostro futuro. Ci teniamo a dirvi che il vostro dono sarà anche
                un aiuto concreto per gli altri: una parte del vostro regalo
                sarà devoluta al sostegno di alcune famiglie nella Striscia di
                Gaza grazie all'impegno di{" "}
                <a
                  href="https://www.instagram.com/martaalacevich_illustrazioni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline decoration-rose-300 transition-colors"
                >
                  @martaalacevich_illustrazioni
                </a>{" "}
                e alla missione di Llamellín in Perù (dell' Associazione Amici
                del Perù)<br></br>
              </p>
              {!showIban ? (
                <Button
                  variant="outline"
                  className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-2xl py-6"
                  onClick={() => setShowIban(true)}
                >
                  Mostra IBAN
                </Button>
              ) : (
                <div className="bg-rose-50 p-6 rounded-lg border border-rose-100 break-words font-numbers text-rose-900 shadow-inner animate-in zoom-in-95 duration-300 text-left">
                  <p className="text-2xl font-serif">
                    <span className="italic text-rose-600/70 text-xl block leading-none mb-1">
                      <br></br>Iban:
                    </span>
                    <span className="font-semibold">{iban}</span>
                  </p>

                  <Separator className="bg-rose-200 mb-4 opacity-100" />

                  <div className="space-y-3">
                    <p className="text-2xl font-serif">
                      <span className="italic text-rose-600/70 text-xl block leading-none mb-1">
                        Intestatario:
                      </span>
                      <span className="font-semibold">{intestatorio}</span>
                    </p>
                    <p className="text-2xl font-serif">
                      <span className="italic text-rose-600/70 text-xl block leading-none mb-1">
                        Banca:
                      </span>
                      <span className="font-semibold">{banca}</span>
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-6 text-rose-600 hover:text-rose-700 underline text-2xl py-4"
                    onClick={copyIban}
                  >
                    Copia IBAN
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-cream backdrop-paper border-rose-200 flex flex-col h-full shadow-paper">
                <CardHeader className="text-center">
                  <Church className="w-10 h-10 mx-auto mb-2 text-rose-500 drop-shadow-sm" />
                  <CardTitle className="text-4xl text-rose-500 font-serif">
                    Cerimonia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                  <div className="flex items-center gap-4 pl-2">
                    <Clock className="w-8 h-8 text-rose-500" />
                    <span className="font-numbers text-3xl text-gray-700">
                      16:00
                    </span>
                  </div>
                  <div className="flex items-start gap-4 pl-2">
                    <MapPin className="w-8 h-8 text-rose-500 mt-1" />
                    <div>
                      <a
                        href="https://maps.app.goo.gl/P5nni7jj33ido3Mu5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-rose-700 underline decoration-rose-300 transition-colors"
                      >
                        <p className="text-2xl font-medium font-serif underline decoration-rose-200">
                          Pieve di San Giovanni Battista
                        </p>
                        <p className="text-xl text-gray-600 italic font-serif mt-1">
                          Piazza Cavour 10, San Giovanni Valdarno
                        </p>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cream backdrop-paper border-rose-200 flex flex-col h-full shadow-paper">
                <CardHeader className="text-center">
                  <LucidePartyPopper className="w-10 h-10 mx-auto mb-2 text-rose-500 drop-shadow-sm" />
                  <CardTitle className="text-4xl text-rose-500 font-serif">
                    Ricevimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                  <div className="flex items-center gap-4 pl-2">
                    <Clock className="w-8 h-8 text-rose-500" />
                    <span className="font-numbers text-3xl text-gray-700">
                      18:30
                    </span>
                  </div>
                  <div className="flex items-start gap-4 pl-2">
                    <MapPin className="w-8 h-8 text-rose-500 mt-1" />
                    <div>
                      <a
                        href="https://maps.app.goo.gl/sLmr8CeNQErMnqmR7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-rose-700 underline decoration-rose-300 transition-colors"
                      >
                        <p className="text-3xl font-medium font-serif underline decoration-rose-200">
                          Sereto Base Scout Agesci
                        </p>
                        <p className="text-xl text-gray-600 italic font-serif mt-1">
                          Via Chiantigiana, Cavriglia AR
                        </p>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cream backdrop-paper border-rose-200 flex flex-col h-full shadow-paper">
                <CardHeader className="text-center">
                  <Sparkles className="w-10 h-10 mx-auto mb-2 text-rose-500 drop-shadow-sm" />
                  <CardTitle className="text-4xl text-rose-500 font-serif">
                    Consigli Utili
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                  <div>
                    <p className="text-3xl font-medium font-serif underline decoration-rose-200">
                      Si consigliano scarpe comode e qualcosa per coprirsi nelle
                      fresche sere d'estate.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-cream backdrop-paper border-rose-200 flex flex-col h-full shadow-paper">
                <CardHeader className="text-center">
                  <Phone className="w-10 h-10 mx-auto mb-2 text-rose-500 drop-shadow-sm" />

                  <CardTitle className="text-4xl text-rose-500 font-serif">
                    Domande?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                  <div>
                    <p className="text-3xl font-medium font-serif decoration-gray-200">
                      Lorenzo:{" "}
                      <a
                        href="tel:+393663200194"
                        className="text-gray-800 hover:text-gray-800"
                      >
                        366 3200194
                      </a>
                      <br />
                      Claudia:{" "}
                      <a
                        href="tel:+393927287469"
                        className="text-gray-800 hover:text-gray-800"
                      >
                        392 7287469
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="text-center mt-16 text-gray-500 font-serif">
          <p>
            <br />
          </p>
          <Heart className="w-6 h-6 mx-auto mb-3 text-rose-300" />

          <p className="text-6xl min-[450px]:text-7xl md:text-8xl mb-6 text-gray-800 font-serif text-shadow-soft text-rose-600">
            Grazie
          </p>
          <p className="font-numbers text-2xl">
            Claudia & Lorenzo • 13 06 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
