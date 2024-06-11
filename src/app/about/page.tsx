"use client";

import "./page.scss";
import dynamic from "next/dynamic";
import { usePageContent } from "app/shared/hooks/usePageContent";
import { PathOptions } from "app/types/PageContentEnums";
import { Breadcrumb } from "app/components/shared/Breadcrumb/Breadcrumb";
import { ROUTE_PATHS } from "app/shared/const";

const SafDivider = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafDivider),
    { ssr: false }
);

const SafBreadcrumbItem = dynamic(
    () =>
        import("@saffron/core-components/react").then(
        module => module.SafBreadcrumbItem
        ),
    { ssr: false }
);

export default function About() {
    const  { content }  = usePageContent(PathOptions.ABOUT);

    if (!content) {
        return null;
    }
    
    const { title, htmlTopContent, htmlHighlightContent, htmlBodyContent, htmlFooterContent } = content;

    return (
        <>
            {/* <HelmetTags title={title} /> */}
            <Breadcrumb>
                <SafBreadcrumbItem href={ROUTE_PATHS.homePage}>Home</SafBreadcrumbItem>
                <SafBreadcrumbItem href={ROUTE_PATHS.appsPage}>About</SafBreadcrumbItem>
            </Breadcrumb>
            <div className="p-4 about-page app-store-container-page">
                <div className="d-flex justify-content-between align-items-center w-100 mb-4">
                    <h1 className="m-0 page-title">{title}</h1>
                </div>

                <SafDivider className="mb-3" />

                <section className='about-content'>
                    {htmlTopContent && (<div dangerouslySetInnerHTML={{ __html: htmlTopContent }} />)}

                    {htmlHighlightContent && (
                        <div className='advantages-wrapper text-center p-5' dangerouslySetInnerHTML={{ __html: htmlHighlightContent }} />
                    )}

                    {htmlBodyContent && (
                        <div className='body-content' dangerouslySetInnerHTML={{ __html: htmlBodyContent }} />
                    )}

                    {htmlFooterContent && (<div dangerouslySetInnerHTML={{ __html: htmlFooterContent }} />)}
                </section>
            </div>
        </>
    );

};
