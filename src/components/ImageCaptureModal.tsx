import React, { useState, useRef, useEffect } from 'react';
import { ImageAttachment, AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Camera, Upload, X, Check, Sparkles } from 'lucide-react';
import { getSampleQuestions, svgToDataUrl, SampleQuestion } from '../data/sampleQuestions';

interface ImageCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImage: (attachment: ImageAttachment, promptText?: string) => void;
  currentLanguage: AppLanguage;
}

export const ImageCaptureModal: React.FC<ImageCaptureModalProps> = ({
  isOpen,
  onClose,
  onConfirmImage,
  currentLanguage,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageAttachment | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage];
  const sampleQuestions = getSampleQuestions(currentLanguage);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError(t.cameraError);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const base64Data = dataUrl.split(',')[1];

    setSelectedImage({
      data: base64Data,
      mimeType: 'image/jpeg',
      previewUrl: dataUrl,
    });

    stopCamera();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setSelectedImage({
        data: base64Data,
        mimeType: file.type || 'image/jpeg',
        previewUrl: result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleQuestion) => {
    if (!sample.sampleImageSvg) return;
    const dataUrl = svgToDataUrl(sample.sampleImageSvg);
    const base64Data = dataUrl.split(',')[1];

    setSelectedImage({
      data: base64Data,
      mimeType: 'image/svg+xml',
      previewUrl: dataUrl,
    });
    setCustomPrompt(sample.prompt);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onConfirmImage(selectedImage, customPrompt.trim());
      onClose();
      setSelectedImage(null);
      setCustomPrompt('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{t.imageModalTitle}</h2>
              <p className="text-xs text-emerald-100">{t.imageModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {cameraError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
              {cameraError}
            </div>
          )}

          {/* Active Camera View */}
          {isCameraActive ? (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-emerald-500">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <Camera className="w-4 h-4" /> {t.imageSnapBtn}
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium"
                >
                  {t.imageCancelBtn}
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            /* Image Preview */
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-200 max-h-64 flex items-center justify-center">
                <img
                  src={selectedImage.previewUrl}
                  alt="Preview"
                  className="max-h-64 object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.imageSpecialPromptLabel}
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={t.imageSpecialPromptPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          ) : (
            /* Upload & Camera Buttons */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-800">{t.imageGalleryBtn}</span>
                  <span className="text-xs text-slate-500">{t.imageGalleryDesc}</span>
                </button>

                <button
                  onClick={startCamera}
                  className="p-6 rounded-2xl border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-800">{t.imageCameraBtn}</span>
                  <span className="text-xs text-slate-500">{t.imageCameraDesc}</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Sample Questions Section */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.imageDemoTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleQuestions.filter((s) => s.hasSampleImage).map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/30 text-left transition-all flex items-center gap-2.5 group"
                    >
                      <span className="text-xl">{sample.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-800 truncate">{sample.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{sample.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {selectedImage ? t.imageStatusReady : t.imageStatusPick}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              {t.imageCancelBtn}
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedImage}
              className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> {t.imageStartSolveBtn}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
